const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const usersRoutes = require("./routes/usersRouter");
const placesRoutes = require("./routes/placesRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const countriesRoutes = require("./routes/countriesRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorHandler");

// predefined middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// resources
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/places", placesRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/countries", countriesRoutes);

app.all("*", (req, res, next) => {
  const err = new AppError(
    `can't find ${req.originalUrl} with ${req.method} method on this server`,
    404
  );
  next(err);
});

// error handler middleware
app.use(globalErrorHandler);

module.exports = app;
