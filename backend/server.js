require("dotenv").config();

const express = require("express");
const connectDB = require("./connection");
const cookieParser  = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

//initialise DB
connectDB();

//core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//CORS setup 
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// API routes 
app.get("/", (_req, res) => res.json({ msg: "API running" }));

app.use("/auth",       require("./routes/authRoutes"));
app.use("/properties", require("./routes/propertyRoutes"));

//serve React build in production 
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "..", "frontend", "build");
  app.use(express.static(clientBuildPath));

  // SPA – unknown routes → index.html
  app.get("*", (_req, res) =>
    res.sendFile(path.join(clientBuildPath, "index.html"))
  );
}

//start server 
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
