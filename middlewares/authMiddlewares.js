const AppError = require("../utils/appError");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) getting the token and check if it's exist
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) next(new AppError("you are not logged in", 401));

  // verfy the token if it's valid token and make sure that the token has not been modified
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if the user is still has an account
  const user = await User.findById(decoded.id);

  if (!user)
    return next(
      new AppError("the user belongign to this token does no longer exist", 401)
    );

  // check if the password has changed after the last time the user logged in
  const passwordHasChanged = user.changedPasswordAfter(decoded.iat);

  console.log(passwordHasChanged);

  next();
});

module.exports = {
  protect,
};
