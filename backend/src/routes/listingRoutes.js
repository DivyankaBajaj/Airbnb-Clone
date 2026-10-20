const express = require("express");
const router = express.Router();
const { protect, hostOnly } = require("../middleware/auth");
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");

// Public routes (Bina login ke)
router.get("/", getListings);
router.get("/:id", getListing);

// Private routes (Login zaroori hai)
router.post("/", protect, hostOnly, createListing);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

module.exports = router;