const express = require("express");
const {
  signup,
  login,
  logout,
  profile
} = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const User = require("../models/userModel");
const Property = require("../models/propertyModel");

const router = express.Router();

// Public auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", profile);

// Authenticated user routes
router.get("/user/home", authenticateUser, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  const myProperties = await Property.find({ owner: req.userId });
  res.json({ user, myProperties });
});

router.get("/my-properties", authenticateUser, async (req, res) => {
  const properties = await Property.find({ owner: req.userId });
  res.json({ properties });
});

module.exports = router;
