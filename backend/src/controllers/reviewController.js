const Review = require("../models/Review");
const Listing = require("../models/Listing");

// Naya review add karna
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const listingId = req.params.listingId;

    // Review create karo
    const review = await Review.create({
      listing: listingId,
      author: req.user._id,
      rating,
      comment,
    });

    // Ghar ki average rating calculate karo aur update karo
    const reviews = await Review.find({ listing: listingId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Listing.findByIdAndUpdate(listingId, {
      rating: avgRating.toFixed(1),
      reviewCount: reviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kisi ghar ke saare reviews dekhna
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ listing: req.params.listingId }).populate("author", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};