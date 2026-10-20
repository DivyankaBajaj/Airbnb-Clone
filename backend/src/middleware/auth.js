const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Ye check karega ki user logged in hai ya nahi
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // User ko database se dhoondh kar request mein daal do
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Ye check karega ki user 'host' hai ya nahi
const hostOnly = (req, res, next) => {
  if (req.user.role !== "host") {
    return res.status(403).json({ message: "Host access only" });
  }
  next();
};

module.exports = { protect, hostOnly };