import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen flex justify-center items-center">
        <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 w-full mx-4">
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
