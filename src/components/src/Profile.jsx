import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null); // State to store user info
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData)); // Parse user data
    } else {
      navigate("/login"); // Redirect to login if no user data is found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("user"); // Remove user data from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
   <>
   <Navbar/>
   <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 w-full mx-4"> {/* Added mx-4 for mobile responsiveness */}
        {user ? (
          <>
            <div className="text-center mb-6">
              <img
                src={user.userImage}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-purple-600 mx-auto"
              />
              <h2 className="text-3xl font-bold text-gray-100 mt-4">{user.fullname}</h2>
              <p className="text-[#ffffff40]">{user.email}</p>
              <p className="text-[#ffffff40]">Registration Number: {user.registrationNumber}</p>
            </div>
            <div className="text-center space-y-4">
              <button
                onClick={() => navigate("/")}
                className="px-4 mx-4 py-2 text-white bg-purple-600 rounded-md transition duration-300 ease-in-out hover:bg-purple-700 mb-2" // Added mb-2 for margin
              >
                Back to Home
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-purple-600 border border-purple-600 rounded-md transition duration-300 ease-in-out hover:bg-purple-600 hover:text-white" // Updated styling for transparent background with ring
              >
                Logout
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
