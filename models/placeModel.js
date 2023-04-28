const mongoose = require("mongoose");
const slugify = require("slugify");

const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // unique: true,
      required: [true, "add a title to your place"],
    },
    slug: String,
    host: {
      type: String,
      // ref: 'User',
      required: [true, "host id is required"],
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "add the location of your place"],
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    viewedTimesLastWeek: {
      type: Number,
      default: 0,
      min: 0,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    images: {
      type: [String],
      required: [true, "add an image to your place"],
    },
    maxAdults: Number,
    maxChildren: Number,
    maxInfants: Number,
    maxPets: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

placeSchema.virtual("shortDescription").get(function () {
  return `${this.description?.slice(0, 50)}...`;
});

placeSchema.post(/\bfind\b/, function (docs, next) {
  docs.forEach((doc) => {
    doc.images = doc.images.map(
      (path) =>
        `http://${process.env.IPAddress}:${process.env.port}/img/places/${path}`
    );
  });
  next();
});

placeSchema.post(/\bfindOne\b/, function (doc, next) {
  doc.images = doc.images.map(
    (path) =>
      `http://${process.env.IPAddress}:${process.env.port}/img/places/${path}`
  );
  next();
});

const Place = new mongoose.model("Place", placeSchema);

module.exports = Place;
