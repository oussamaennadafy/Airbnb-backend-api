const express = require("express");
const router = express.Router();

// middlewares
const {
  loggedIn,
  aliasTopPlaces,
} = require("./../middlewares/userMiddlewares");

// route handlres
const {
  getAllPlaces,
  getOnePlace,
  createPlace,
  uploadPlaceImages,
  updatePlace,
  updateAllPlaces,
  deletePlace,
} = require("./../controllers/placeController");

router.route("/top-5-cheap").get(aliasTopPlaces, getAllPlaces);

// router.route("/monthly-plan/:year").get(getMonthlyPlan);

router.route("/:id").get(getOnePlace).delete(deletePlace).patch(updatePlace);

router
  .route("/")
  .get(getAllPlaces)
  .post(uploadPlaceImages, createPlace)
  .patch(updateAllPlaces);

// router.route("/categories/:category")
//  .get(getPlacesByCategory)

module.exports = router;
