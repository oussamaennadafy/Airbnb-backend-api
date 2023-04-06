const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
 title: {
  type: String,
  required: [true, "add a title to your place"],
 },
 host: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: [true, "host id is required"]
 },
 location: {
  type: String,
  required: [true, "add the location of your place"],
 },
 ratingAverage: {
  type: Number,
  default: 0,
  min: 0,
  max: 5
 },
 ratingsCount: {
  type: Number,
  default: 0,
  min: 0
 },
 viewedTimesLastWeek: {
  type: Number,
  default: 0,
  min: 0
 },
 availability: {
  start: Date,
  end: Date
 },
 price: {
  type: Number,
  min: 0
 },
 images: {
  type: [String],
  required: [true, "add an image to your place"]
 }
})

const Place = new mongoose.model('Place', placeSchema)

module.exports = Place