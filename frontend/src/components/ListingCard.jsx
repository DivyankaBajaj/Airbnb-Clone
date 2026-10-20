import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  // Agar image nahi hai toh ek default image lagao
  const defaultImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";
  const imageUrl = listing.images && listing.images.length > 0 ? listing.images[0] : defaultImage;

  return (
    <Link to={`/listings/${listing._id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
        
        {/* Image */}
        <div className="h-64 overflow-hidden relative">
          <img
            src={imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-800 truncate pr-2">
              {listing.title}
            </h3>
            <span className="text-yellow-500 flex items-center gap-1 text-sm font-medium">
              ★ {listing.rating || "New"}
            </span>
          </div>
          
          <p className="text-gray-500 text-sm mt-1">
            {listing.location.city}, {listing.location.country}
          </p>
          
          <p className="mt-2 text-gray-800">
            <span className="font-bold text-lg">₹{listing.price}</span> night
          </p>
        </div>

      </div>
    </Link>
  );
}