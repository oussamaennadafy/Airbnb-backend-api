const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
    },
    email: {
      type: String,
      required: [true, "Please tell us your email"],
      lowercase: true,
      unique: true,
      validate: {
        validator: (email) => /^\S+@\w+\.\w+$/.test(email),
        message: "please provide a valid email address",
      },
    },
    photo: String,
    role: {
      type: String,
      enum: ["user", "host", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [5, "password must have at least 5 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirme your password"],
      validate: {
        validator: function (passwordConfirm) {
          return passwordConfirm === this.password;
        },
        message: "passwords don't match",
      },
    },
    passwordUpdatedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  }
  // {
  //   timestamps: true,
  // }
);

// pre save hook
userSchema.pre(/(save|findByIdAndUpdate)/, async function (next) {
  if (!this.isModified("password")) return next();

  // hash the password
  this.password = await bcrypt.hash(this.password, 10);

  // delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  condidatePassword,
  userPassword
) {
  return await bcrypt.compare(condidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  return parseInt(this.passwordUpdatedAt.getTime() / 1000) > JWTTimestamp;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
