require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/Listing"); // Path check kar lena, agar galti aaye toh
const User = require("../models/User");

const connectDB = require("../config/db");

const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop",
    price: 1500,
    location: { city: "Malibu", country: "United States" },
    maxGuests: 4,
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: "https://images.unsplash.com/photo-1502672260266-1c1e525c14a2?q=80&w=1000&auto=format&fit=crop",
    price: 2000,
    location: { city: "New York City", country: "United States" },
    maxGuests: 2,
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop",
    price: 1200,
    location: { city: "Aspen", country: "United States" },
    maxGuests: 5,
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop",
    price: 3500,
    location: { city: "Florence", country: "Italy" },
    maxGuests: 6,
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the trees in this unique treehouse retreat. A true nature lover's paradise.",
    image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1000&auto=format&fit=crop",
    price: 1000,
    location: { city: "Portland", country: "United States" },
    maxGuests: 2,
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop",
    price: 2500,
    location: { city: "Cancun", country: "Mexico" },
    maxGuests: 4,
  },
];

const initDB = async () => {
  try {
    await connectDB();
    
    // 1. Ek dummy host user dhundo ya banao
    let host = await User.findOne({ role: "host" });
    if (!host) {
      host = await User.create({
        name: "Demo Host",
        email: "host@demo.com",
        password: "password123",
        role: "host",
      });
    }

    // 2. Purani listings delete karo (taaki duplicate na ho)
    await Listing.deleteMany({});
    
    // 3. Har listing mein host ki ID aur image add karke save karo
    const listingsWithHost = sampleListings.map((obj) => ({
      ...obj,
      host: host._id,
      images: [obj.image], // Humare model mein images ek array hai
    }));

    await Listing.insertMany(listingsWithHost);
    console.log("✅ Data successfully added to database!");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

initDB();