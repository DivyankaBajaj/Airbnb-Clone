const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { createReview, getReviews } = require("../controllers/reviewController");

// Review dekhna (sabke liye)
router.get("/:listingId", getReviews);

// Review dena (sirf login walo ke liye)
router.post("/:listingId", protect, createReview);

module.exports = router;