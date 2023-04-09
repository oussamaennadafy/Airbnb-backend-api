const express = require('express')
const router = express.Router()

const { getAllCategories } = require('./../controllers/categoriesController')

router.route('/')
 .get(getAllCategories)

module.exports = router