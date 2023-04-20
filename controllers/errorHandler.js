const errorHandler = (err, req, res, next) => {
  err.statusCode ||= 500;
  err.status ||= "error";

  const { statusCode, status, message } = err;

  res.status(statusCode).json({
    status,
    message,
  });
};

module.exports = errorHandler;
