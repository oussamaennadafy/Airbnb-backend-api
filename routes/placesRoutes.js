const express = require('express')
const router = express.Router()

// middlewares
const { loggedIn, mutateQueryRequest } = require('./../middlewares/userMiddlewares')

// route handlres
const { getAllPlaces, getOnePlace, createPlace, uploadPlaceImages, getPlacesByCategory, getTopFiveChaep } = require('./../controllers/placeController')


router.route('/top-5-cheap')
 .get(mutateQueryRequest, getAllPlaces)

router.route("/:id")
 .get(getOnePlace)

router.route('/')
 .get(getAllPlaces)
 .post(loggedIn, uploadPlaceImages, createPlace)



// router.route("/categories/:category")
//  .get(getPlacesByCategory)

module.exports = router