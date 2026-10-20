// Import jsonwebtoken library
const jwt = require("jsonwebtoken");

// Function to generate a JWT token for a user
const generateToken = (userId, role) => {
  // Sign payload with secret key and expiry from .env
  return jwt.sign(
    { id: userId, role: role },           // payload
    process.env.JWT_SECRET,               // secret
    { expiresIn: process.env.JWT_EXPIRES_IN } // expiry
  );
};

// Export the function
module.exports = generateToken;