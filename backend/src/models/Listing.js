// Import mongoose
const mongoose = require("mongoose");

// Define Listing schema
const listingSchema = new mongoose.Schema(
  {
    // Listing title
    title: { type: String, required: true, trim: true },
    // Description
    description: { type: String, required: true },
    // Price per night
    price: { type: Number, required: true, min: 0 },
    // Category of listing
    category: {
      type: String,
      enum: ["Beach", "Mountain", "City", "Cabin", "Villa", "Apartment"],
      default: "Apartment",
    },
    // Location with coordinates for Maps API
    location: {
      address: { type: String },
      city: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 },
      },
    },
    // Image URLs (Cloudinary)
    images: [{ type: String }],
    // Amenities array
    amenities: [{ type: String }],
    // Max guests allowed
    maxGuests: { type: Number, default: 2 },
    // Bedrooms
    bedrooms: { type: Number, default: 1 },
    // Beds
    beds: { type: Number, default: 1 },
    // Bathrooms
    bathrooms: { type: Number, default: 1 },
    // Host reference
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Aggregated rating (updated on review)
    rating: { type: Number, default: 0 },
    // Total reviews count
    reviewCount: { type: Number, default: 0 },
    // Soft delete flag
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Text index for search
listingSchema.index({ title: "text", "location.city": "text" });

// Export model
module.exports = mongoose.model("Listing", listingSchema);