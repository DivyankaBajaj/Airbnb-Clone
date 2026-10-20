import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import ReviewSection from "../components/ReviewSection"; // Review Component import kiya

export default function ListingDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Booking form states
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingMsg, setBookingMsg] = useState("");

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then((res) => {
        setListing(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login to book this place!");
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      setBookingMsg("Please select both check-in and check-out dates.");
      return;
    }

    try {
      setBookingMsg("Processing...");
      const res = await api.post("/bookings", {
        listingId: listing._id,
        checkIn,
        checkOut,
        guests: Number(guests),
      });
      setBookingMsg("✅ Booking confirmed successfully!");
    } catch (error) {
      setBookingMsg(`❌ ${error.response?.data?.message || "Booking failed"}`);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!listing) return <p className="text-center py-10">Listing not found!</p>;

  const defaultImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80";
  const imageUrl = listing.images && listing.images.length > 0 ? listing.images[0] : defaultImage;

  // Aaj ki date nikalne ke liye (taaki past date select na ho)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800">{listing.title}</h1>
      <p className="text-gray-600 mt-1">📍 {listing.location.city}, {listing.location.country}</p>

      <div className="mt-4 rounded-2xl overflow-hidden h-[400px]">
        <img src={imageUrl} alt={listing.title} className="w-full h-full object-cover" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Hosted by {listing.host?.name || "Host"}</h2>
          <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          
          {/* Yahan Review Section aayega */}
          <ReviewSection listingId={listing._id} />
        </div>

        {/* Right Side: Booking Card */}
        <div className="md:col-span-1">
          <div className="border rounded-2xl p-6 shadow-lg sticky top-24 bg-white">
            <p className="text-2xl font-bold mb-4">
              ₹{listing.price} <span className="text-base font-normal text-gray-500">/ night</span>
            </p>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-2">
                <label className="text-xs font-bold text-gray-600 block">CHECK-IN</label>
                <input 
                  type="date" 
                  min={today} 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full outline-none text-sm mt-1" 
                />
              </div>
              <div className="border rounded-lg p-2">
                <label className="text-xs font-bold text-gray-600 block">CHECK-OUT</label>
                <input 
                  type="date" 
                  min={checkIn || today} 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full outline-none text-sm mt-1" 
                />
              </div>
              <div className="border rounded-lg p-2">
                <label className="text-xs font-bold text-gray-600 block">GUESTS</label>
                <input 
                  type="number" 
                  min="1" 
                  max={listing.maxGuests} 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full outline-none text-sm mt-1" 
                />
              </div>
            </div>

            <button 
              onClick={handleBooking}
              className="w-full bg-brand text-white font-semibold py-3 rounded-lg mt-6 hover:bg-rose-600 transition"
            >
              Reserve Now
            </button>
            
            {bookingMsg && (
              <p className="text-center font-medium text-sm mt-4 text-gray-700">
                {bookingMsg}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}