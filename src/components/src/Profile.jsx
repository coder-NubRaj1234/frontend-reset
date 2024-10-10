import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode directly

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate();

  // Function to fetch user data from the token
  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Decode the token to get user data
        // Set user state based on decoded token data
        setUser({
          id: decodedUser.id || decodedUser.user_id, // Adjusted to use the correct key
          fullname: decodedUser.name || "Unnamed User", 
          email: decodedUser.email || "No Email", 
          picture: decodedUser.picture || 'https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg',
          isAdmin: decodedUser.isAdmin || false, // Assuming this is part of the JWT payload
          joinedDate: new Date(decodedUser.iat * 1000).toLocaleDateString() || "N/A", // Format joined date
        });
        setLoading(false); // Set loading to false after fetching user data
      } catch (error) {
        console.error("Invalid token", error);
        setError("Failed to decode token. Please log in again.");
        navigate("/login"); // Navigate to login if the token is invalid
      }
    } else {
      setLoading(false); // Set loading to false if no token
      navigate("/login"); // Navigate to login if no token
    }
  };

  // Call fetchUserData to update user state on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleNavigateHome = () => {
    navigate("/"); // Directly navigate to home without loading state
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    setUser(null); // Clear user state
    navigate("/login"); // Redirect to login
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 min-h-screen flex justify-center items-center">
        <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 w-full mx-4">
          {loading ? ( 
            <p className="text-white">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p> // Display error message if any
          ) : (
            user && ( // Ensure user data is available before rendering
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
                    className="relative px-4 py-2 text-white bg-purple-600 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-700 hover:shadow-[0px_0px_15px_#6a0dad] mb-2"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={handleLogout}
                    className="relative px-4 py-2 text-purple-600 border border-purple-600 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-600 hover:text-white hover:shadow-[0px_0px_15px_#ff4dff]"
                  >
                    Logout
                  </button>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
