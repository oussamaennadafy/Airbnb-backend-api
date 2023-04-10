const express = require('express')
const router = express.Router()

const { getAllPrefixes } = require('./../controllers/countriesController')

router.route('/phonePrefixs')
 .get(getAllPrefixes)


module.exports = router