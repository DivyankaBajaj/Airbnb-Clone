import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ReviewSection({ listingId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  // Reviews fetch karo
  useEffect(() => {
    api.get(`/reviews/${listingId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, [listingId]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      setMsg("Please login to leave a review.");
      return;
    }
    try {
      const res = await api.post(`/reviews/${listingId}`, { rating: Number(rating), comment });
      setReviews([res.data, ...reviews]);
      setComment("");
      setRating(5);
      setMsg("✅ Review added successfully!");
    } catch (error) {
      setMsg(`❌ ${error.response?.data?.message || "Failed to add review"}`);
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">Reviews ({reviews.length})</h2>

      {/* Review Form */}
      <form onSubmit={submitReview} className="bg-gray-50 p-4 rounded-xl mb-6">
        <h3 className="font-medium mb-2">Leave a review</h3>
        <div className="flex gap-2 mb-2">
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2 rounded-lg outline-none"
          >
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
          <input
            type="text"
            placeholder="Write your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="flex-1 border p-2 rounded-lg outline-none"
          />
          <button type="submit" className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-rose-600">
            Submit
          </button>
        </div>
        {msg && <p className="text-sm font-medium mt-2">{msg}</p>}
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="border-b pb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{rev.author?.name || "Guest"}</span>
                <span className="text-yellow-500">{"⭐".repeat(rev.rating)}</span>
              </div>
              <p className="text-gray-700">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}