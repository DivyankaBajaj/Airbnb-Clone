import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function HostDashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend se apni listings mangwao
    api.get("/listings") 
      .then((res) => {
        // Sirf apne ghar filter karo
        const myListings = res.data.filter((l) => l.host._id === user._id);
        setListings(myListings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-center py-10">Loading dashboard...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Host Dashboard</h1>
        {/* Naya ghar add karne ka button (abhi ke liye sirf design) */}
        <button className="bg-brand text-white px-4 py-2 rounded-lg">+ Add New Listing</button>
      </div>

      {listings.length === 0 ? (
        <p className="text-gray-500">You haven't listed any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listings.map((listing) => (
            <div key={listing._id} className="border p-4 rounded-xl flex gap-4 bg-white shadow-sm">
              <img 
                src={listing.images[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"} 
                alt="" 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-bold text-lg">{listing.title}</h3>
                <p className="text-sm text-gray-500">{listing.location.city}</p>
                <p className="text-sm font-semibold mt-1">₹{listing.price} / night</p>
                <div className="mt-2 flex gap-2">
                  <button className="text-blue-500 text-sm hover:underline">Edit</button>
                  <button className="text-red-500 text-sm hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}