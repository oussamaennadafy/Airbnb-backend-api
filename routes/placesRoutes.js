const express = require("express");
const router = express.Router();

// middlewares
const { aliasTopPlaces } = require("./../middlewares/userMiddlewares");
const { protect, restrictTo } = require("../controllers/authController");

// route handlres
const {
  getAllPlaces,
  getOnePlace,
  createPlace,
  uploadPlaceImages,
  updatePlace,
  deletePlace,
} = require("./../controllers/placeController");

router.route("/top-5-cheap").get(aliasTopPlaces, getAllPlaces);

// router.route("/monthly-plan/:year").get(getMonthlyPlan);

router
  .route("/:id")
  .get(getOnePlace)
  .delete(protect, restrictTo("host", "admin"), deletePlace)
  .patch(protect, restrictTo("host", "admin"), updatePlace);

router.route("/").get(getAllPlaces).post(uploadPlaceImages, createPlace);

// router.route("/categories/:category")
//  .get(getPlacesByCategory)

module.exports = router;
