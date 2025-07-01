const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup: register new user
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "This email is already registered." });
    }

    // hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Something went wrong during signup." });
  }
};

// Login: authenticate user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    const isMatch = user && await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // send token as http-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    });

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Something went wrong during login." });
  }
};

// Logout: clear the auth token cookie
exports.logout = (_req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.json({ message: "You have been logged out successfully." });
};

// Profile: get current logged-in user
exports.profile = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authenticated." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ error: "User not found." });

    res.json({ user });
  } catch (err) {
    console.error("Profile access error:", err);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};
