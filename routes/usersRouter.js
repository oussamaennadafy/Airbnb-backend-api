const express = require("express");
const router = express.Router();

const { getAllUsers } = require("./../controllers/userController");
const {
  signup,
  login,
  resetPassword,
  protect,
  restrictTo,
  forgotPassword,
} = require("./../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.route("/").get(protect, restrictTo("admin"), getAllUsers);

module.exports = router;
