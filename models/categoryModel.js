const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
 src: String,
 label: String
})

const Category = new mongoose.model('Category', categorySchema)
module.exports = Category