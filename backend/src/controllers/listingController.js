const Listing = require("../models/Listing");

// 1. Saare listings dekhna (Search ke saath)
exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("host", "name");
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Ek specific listing dekhna
exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("host", "name email");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Nayi listing banana
exports.createListing = async (req, res) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      host: req.user._id, // Jo user logged in hai uski ID daal do
    });
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Listing update karna (Sirf apni listing)
exports.updateListing = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // Check karo ki ye listing isi user ki hai
    if (!listing.host.equals(req.user._id)) {
      return res.status(403).json({ message: "Not your listing" });
    }

    listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Listing delete karna
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (!listing.host.equals(req.user._id)) {
      return res.status(403).json({ message: "Not your listing" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};