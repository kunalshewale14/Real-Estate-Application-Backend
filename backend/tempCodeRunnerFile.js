const express = require("express");
const connectDB = require("./connection");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route to show the homepage()
app.get("/", (req, res) => {
  res.render("home"); 
});

// User authentication routes
app.use("/", authRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

