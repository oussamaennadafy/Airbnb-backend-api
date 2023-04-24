const mogoose = require("mongoose");

const connectDB = () => {
  const DB = process.env.DATABASE?.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mogoose
    .connect(DB)
    .then(() => console.log("database connected successfully"))
    .catch(() => console.log("error occure while connecting database"));
};

module.exports = connectDB;
