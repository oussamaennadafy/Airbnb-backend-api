const express = require('express')
const router = express.Router()

// middlewares
const { loggedIn } = require('./../middlewares/userMiddlewares')

// route handlres
const { getAllPlaces, getOnePlace, createPlace, uploadPlaceImages } = require('./../controllers/placeController')

router.route('/')
 .get(getAllPlaces)
 .post(loggedIn, uploadPlaceImages, createPlace)

router.route("/:id")
 .get(getOnePlace)

module.exports = router