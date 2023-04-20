const express = require("express");
const app = express();
const cors = require("cors");
const usersRoutes = require("./routes/usersRouter");
const placesRoutes = require("./routes/placesRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const countriesRoutes = require("./routes/countriesRoutes");
const AppError = require("./utils/appError");

// predefined middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// resources
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/places", placesRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/countries", countriesRoutes);

app.all("*", (req, res, next) => {
  const err = new AppError(`can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

// error handler middleware
app.use((err, req, res, next) => {
  err.statusCode ||= 500;
  err.status ||= "error";

  const { statusCode, status, message } = err;

  res.status(statusCode).json({
    status,
    message,
  });
});

module.exports = app;
