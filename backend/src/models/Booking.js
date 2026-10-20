// Import mongoose
const mongoose = require("mongoose");

// Define Booking schema
const bookingSchema = new mongoose.Schema(
  {
    // Which listing is being booked
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
    // Who booked it
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Check-in date
    checkIn: { type: Date, required: true },
    // Check-out date
    checkOut: { type: Date, required: true },
    // Number of guests
    guests: { type: Number, default: 1, min: 1 },
    // Total price = nights * listing price
    totalPrice: { type: Number, required: true },
    // Booking status
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

// Index for fast overlap queries
bookingSchema.index({ listing: 1, checkIn: 1, checkOut: 1 });

// Export model
module.exports = mongoose.model("Booking", bookingSchema);