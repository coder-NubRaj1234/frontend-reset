import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { jwtDecode } from "jwt-decode"; // Use jwt-decode directly

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch user data from the token
  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Decode the token to get user data
        // Set user state based on decoded token data
        setUser({
          id: decodedUser._id, // Assuming _id is part of the token payload
          fullname: decodedUser.fullname || "Unnamed User", 
          email: decodedUser.email || "No Email", 
          picture: decodedUser.picture || 'https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg',
          isAdmin: decodedUser.isAdmin || false, // Assuming this is part of the JWT payload
          joinedDate: new Date(decodedUser.createdAt).toLocaleDateString() || "N/A", // Format createdAt
        });
      } catch (error) {
        console.error("Invalid token", error);
        navigate("/login"); // Navigate to login if the token is invalid
      }
    } else {
      navigate("/login"); // Navigate to login if no token
    }
  };

  // Call fetchUserData to update user state on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleNavigateHome = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/");
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token"); // Clear the token from localStorage
      setUser(null); // Clear user state
      navigate("/login"); // Redirect to login
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 min-h-screen flex justify-center items-center">
        <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 w-full mx-4">
          {user ? (
            <>
              <div className="text-center mb-6">
                <img
                  src={user.picture} // Use user image if available
                  alt="Profile"
                  className="w-32 h-32 rounded-full border border-purple-600 mx-auto object-cover mb-4" // Larger profile image
                />
                <h2 className="text-3xl font-bold text-gray-100 mt-4">{user.fullname}</h2>
                <p className="text-[#ffffff40]">{user.email}</p>
                <p className="text-[#ffffff40]">Joined on: {user.joinedDate}</p> {/* Display formatted joined date */}
                <p className="text-[#ffffff40]">Role: {user.isAdmin ? "Admin" : "User"}</p> {/* Display user role */}
              </div>
              <div className="text-center space-y-4">
                <button
                  onClick={handleNavigateHome}
                  disabled={loading}
                  className={`relative px-4 mx-4 py-2 text-white bg-purple-600 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-700 hover:shadow-[0px_0px_15px_#6a0dad] mb-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span className={`inline-block ${loading ? "animate-pulse" : ""}`}>
                    {loading ? "Sending..." : "Back to Home"}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className={`relative px-4 py-2 text-purple-600 border border-purple-600 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-600 hover:text-white hover:shadow-[0px_0px_15px_#ff4dff] ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span className={`inline-block ${loading ? "animate-pulse" : ""}`}>
                    {loading ? "Sending..." : "Logout"}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
