const express = require('express')
const router = express.Router()

// middlewares
const { loggedIn } = require('./../middlewares/userMiddlewares')

// route handlres
const { getAllPlaces, getOnePlace, createPlace, uploadPlaceImages, getPlacesByCategory } = require('./../controllers/placeController')

router.route('/')
 .get(getAllPlaces)
 .post(loggedIn, uploadPlaceImages, createPlace)

router.route("/:id")
 .get(getOnePlace)

router.route("/categories/:category")
 .get(getPlacesByCategory)

module.exports = router