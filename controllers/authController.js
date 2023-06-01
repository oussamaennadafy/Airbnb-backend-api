const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({ name, email, password, passwordConfirm });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    body: {
      token,
      newUser,
    },
  });
});

const login = catchAsync(async (req, res, next) => {
  // extract email and password from request
  const { email, password } = req.body;

  // check email and password
  if (!email.trim() || !password.trim())
    return next(new AppError("please provide email and password", 400));

  // search for user in database
  const user = await User.findOne({ email }).select("+password");

  // check if valid password
  const isCorrectPassword = await user?.correctPassword(
    password,
    user.password
  );

  // if user not found
  if (!user || !isCorrectPassword)
    return next(new AppError("incorrect email or password", 404));

  // create token
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    data: {
      token,
      user,
    },
  });
});

const updatePassword = catchAsync(async (req, res, next) => {
  const { id } = req.user._id;
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  // check if the current password is correct

  const isPasswordCorrect = await req.user.correctPassword(
    currentPassword,
    req.user.password
  );

  if (!isPasswordCorrect)
    return next(
      new AppError("current password is not correct, please try again", 400)
    );

  if (newPassword !== newPasswordConfirm)
    return next(new AppError("new password not match, please try again", 400));

  const updatedUser = User.findByIdAndUpdate(id, req.body);
  if (!updatedUser)
    next(new AppError("updating has failed, please try angain", 404));
  res.status(200).json({
    status: "success",
    body: {
      updatedUser,
    },
  });
});

module.exports = {
  signup,
  login,
  updatePassword,
};
