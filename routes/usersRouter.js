const express = require("express");
const router = express.Router();

const { getAllUsers } = require("./../controllers/userController");
const {
  signup,
  login,
  updatePassword,
} = require("./../controllers/authController");
const { protect } = require("../middlewares/authMiddlewares");

router.post("/signup", signup);
router.post("/login", login);

router.patch("/updatePassword", protect, updatePassword);

router.route("/").get(getAllUsers);

module.exports = router;
