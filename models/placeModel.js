const mongoose = require('mongoose')


const placeSchema = new mongoose.Schema({
 title: {
  type: String,
  required: [true, "add a title to your place"],
 },
 host: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: [true, "host id is required"]
 },
 description: {
  type: String,
 },
 category: {
  type: String,
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
 from: {
  type: String
 },
 to: {
  type: String
 },
 price: {
  type: Number,
  min: 0
 },
 images: {
  type: [String],
  required: [true, "add an image to your place"]
 },
 maxAdults: Number,
 maxChildren: Number,
 maxInfants: Number,
 maxPets: Number,
})

const Place = new mongoose.model('Place', placeSchema)

module.exports = Place