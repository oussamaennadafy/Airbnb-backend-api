const dotenv = require("dotenv");
// const getIpAddress = require('./helpers/getIpAddress');

// process.env.IPAddress = getIpAddress()

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");
const connectDB = require("./config/database");

connectDB();

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(
    `Server running on localhost:${port} in ${process.env.NODE_ENV} mode.`
  );
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
