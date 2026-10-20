// Import cloudinary v2
const cloudinary = require("cloudinary").v2;

// Configure with env vars
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Export
module.exports = cloudinary;