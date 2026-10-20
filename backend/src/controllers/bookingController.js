const Booking = require("../models/Booking");
const Listing = require("../models/Listing");

exports.createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, guests } = req.body;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    // 1. Check-out, Check-in ke baad hona chahiye
    if (start >= end) {
      return res.status(400).json({ message: "Check-out must be after check-in" });
    }

    // 2. Past date check (Naya Add kiya hai)
    // Aaj ki date se ek din pehle ki date set karte hain taaki aaj ki booking allow rahe
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    if (start < today) {
      return res.status(400).json({ message: "Check-in date cannot be in the past" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // 3. Overlap Validation (Double booking rokna)
    const overlap = await Booking.findOne({
      listing: listingId,
      status: { $ne: "cancelled" },
      $or: [
        { checkIn: { $lt: end }, checkOut: { $gt: start } },
      ],
    });

    if (overlap) {
      return res.status(409).json({ message: "Listing is not available for those dates" });
    }

    // 4. Total price calculate karo
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price;

    // 5. Booking create karo
    const booking = await Booking.create({
      listing: listingId,
      guest: req.user._id,
      checkIn: start,
      checkOut: end,
      guests,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};