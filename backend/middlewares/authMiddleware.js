const jwt = require("jsonwebtoken");

// verify token – if missing or invalid, block access
exports.authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // attach user ID to request
    next();
  } catch {
    res.sendStatus(401);
  }
};

// optional token check – attach user ID if token is valid
exports.authOptional = (req, _res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
    } catch {
      // invalid token – ignore
    }
  }

  next();
};
