const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { createBooking } = require("../controllers/bookingController");

// Booking karne ke liye login (protect) zaroori hai
router.post("/", protect, createBooking);

module.exports = router;