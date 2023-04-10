const mongoose = require('mongoose')

const CountrySchema = new mongoose.Schema({
 name: String,
 phonePrefix: String
})

module.exports = new mongoose.model('Country', CountrySchema)