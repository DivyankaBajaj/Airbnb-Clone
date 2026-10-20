// Import express router
const express = require("express");
const router = express.Router();

// Import controller and middleware
const { signup, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// POST /api/auth/signup
router.post("/signup", signup);

// POST /api/auth/login
router.post("/login", login);

// GET /api/auth/me (private)
router.get("/me", protect, getMe);

// Export router
module.exports = router;