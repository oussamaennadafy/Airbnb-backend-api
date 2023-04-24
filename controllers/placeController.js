"use strict";
const Place = require("./../models/placeModel");
const APIFeatures = require("./../utils/APIFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/places");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/").at(-1);
    cb(null, `place-${Date.now()}-${Math.random() * 1000}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("file is not an image"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadPlaceImages = upload.array("images", 15);

const getAllPlaces = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Place.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const places = await features.query;
  res.status(200).json({
    status: "success",
    result: places.length,
    body: {
      places,
    },
  });
});

const getOnePlace = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  if (!place) {
    return next(new AppError(`no place found with this id : ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    result: place.length,
    body: {
      place,
    },
  });
});

const createPlace = catchAsync(async (req, res, next) => {
  const {
    title,
    location,
    host,
    price,
    description,
    category,
    from,
    to,
    maxAdults,
    maxChildren,
    maxInfants,
    maxPets,
  } = req.body;
  const images = req.files?.map(
    (image) =>
      `http://192.168.1.111:${process.env.PORT}/img/places/${image.filename}`
  );
  // if (!title || !location || !host || !price || !images)
  // throw new Error("something went wrong !");
  const createdPlace = await Place.create({
    title,
    description,
    location,
    host,
    price,
    images,
    category,
    from: new Date(from),
    to: new Date(to),
    maxAdults,
    maxChildren,
    maxInfants,
    maxPets,
  });
  res.status(200).json({
    status: "success",
    body: {
      createdPlace,
    },
  });
});

const updatePlace = catchAsync(async (req, res, next) => {
  const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });
  if (!updatedPlace) {
    return next(
      new AppError(
        `no place found to update with this id : ${req.params.id}`,
        404
      )
    );
  }
  res.json({
    status: "success",
    body: {
      updatedPlace,
    },
  });
});

const updateAllPlaces = catchAsync(async (req, res, next) => {
  let places = await Place.find();

  for (let i = 0; i < places.length; i++) {
    let images = places[i].images.map((image) =>
      image.replace("localhost", "192.168.1.111")
    );
    const updated = await Place.findByIdAndUpdate(places[i]._id, { images });
  }

  res.json({
    status: "success",
    body: "done",
  });
});

const deletePlace = catchAsync(async (req, res, next) => {
  const deletedPlace = await Place.findByIdAndDelete(req.params.id);
  if (!deletedPlace) {
    return next(new AppError("place is not exist", 404));
  }
  res.json({
    status: "success",
    body: {
      deletedPlace,
    },
  });
});

module.exports = {
  getAllPlaces,
  getOnePlace,
  createPlace,
  uploadPlaceImages,
  updatePlace,
  deletePlace,
  // rarely used functions
  updateAllPlaces,
};
