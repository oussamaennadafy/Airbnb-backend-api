const mogoose = require('mongoose')

const connectDB = () =>
{
 const DB = process.env.MONGO_URI?.replace('<PASSWORD>', process.env.PASSWORD)
 mogoose.connect(DB)
  .then(() => console.log("database connected"))
  .catch(() => console.log("error occure while connecting database"))
}

module.exports = connectDB