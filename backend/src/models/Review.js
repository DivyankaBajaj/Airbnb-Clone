// Import mongoose
const mongoose = require("mongoose");

// Define Review schema
const reviewSchema = new mongoose.Schema(
  {
    // Listing being reviewed
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
    // Author of review
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Booking reference (only stayed guests can review)
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    // Rating 1-5
    rating: { type: Number, required: true, min: 1, max: 5 },
    // Comment text
    comment: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true }
);

// One review per user per listing
reviewSchema.index({ listing: 1, author: 1 }, { unique: true });

// Export model
module.exports = mongoose.model("Review", reviewSchema);