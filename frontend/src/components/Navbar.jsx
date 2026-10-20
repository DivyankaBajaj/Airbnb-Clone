import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand flex items-center gap-2">
          🏠 Airbnb Clone
        </Link>
        
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              {/* Dashboard Link (Sirf Host ke liye) */}
              {user.role === "host" && (
                <Link 
                  to="/host" 
                  className="hover:bg-gray-100 px-4 py-2 rounded-full font-medium transition"
                >
                  Dashboard
                </Link>
              )}
              
              {/* User Name */}
              <span className="text-gray-700 font-medium">Hi, {user.name}</span>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="bg-gray-100 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-gray-100 px-4 py-2 rounded-full font-medium transition">
                Login
              </Link>
              <Link to="/signup" className="bg-brand text-white px-4 py-2 rounded-full font-medium hover:bg-rose-600 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}