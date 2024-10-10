import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import { FaHome, FaUser, FaRegNewspaper, FaEnvelope, FaBars, FaTimes } from "react-icons/fa"; // Importing icons from React Icons
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/700.css"; // Bold
import "@fontsource/montserrat/400.css"; // Regular
import "@fontsource/montserrat/700.css"; // Bold

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null); // State to store user info
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate(); // To navigate programmatically

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to fetch user details from local storage
  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    // Decode token to get user data
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Use jwtDecode to decode the token
        setUser(decodedUser); // Set user state after decoding token
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };

  // Call fetchUserData to update user state on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear user state
    navigate("/login"); // Redirect to login
  };

  // Navigation links as objects
  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/about", label: "About", icon: <FaUser /> },
    { to: "#blog", label: "Blog", icon: <FaRegNewspaper /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  // Check if user is admin to add admin link
  if (user && user.isAdmin) {
    navLinks.push({ to: "/admin", label: "Admin", icon: <FaUser /> }); // Add Admin link if user is admin
  }

  return (
    <nav
      className={`bg-gray-900 p-4 shadow fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out mt-4 ${
        isScrolled ? "backdrop-blur-lg bg-gray-900/60" : ""
      } rounded-[30px] w-2/3 mx-auto`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-purple-600 text-3xl font-bold">
          <Link to="/">Articles</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />} {/* Close icon or Hamburger icon */}
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:gap-8 mx-auto">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-center text-purple-600 text-lg font-bold hover:text-white transition duration-300"
            >
              <div className="text-2xl">{link.icon}</div> {/* Icon on top */}
              <span>{link.label}</span> {/* Title below */}
            </Link>
          ))}
          {/* Conditional Profile Image and Dropdown */}
          {user ? (
            <div className="relative">
              <div
                className="w-10 h-10 rounded-2xl mt-2 overflow-hidden cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={user.image || 'https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg'} // Fetch user image from token or use placeholder
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {dropdownOpen && (
                <div className="absolute left-0 mt-4 w-58 bg-gray-800 rounded-xl shadow-lg z-50">
                  <div className="px-4 py-2 text-white font-bold">{user.fullname}</div>
                  <div className="px-4 py-2 text-gray-400">{user.email}</div>
                  <Link
                    to="/profile"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 text-purple-600 hover:text-white transition duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-purple-600 hover:text-white transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-purple-600 text-lg font-bold ring ring-purple-600 ring-sm rounded transition duration-300 ease-in-out hover:text-white px-4 py-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-800 rounded-[40px] mx-2`}>
        <div className="flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-center block text-purple-600 text-lg font-bold hover:text-white transition duration-300 py-2 px-4"
            >
              <div className="text-2xl">{link.icon}</div> {/* Icon on top */}
              <span>{link.label}</span> {/* Title below */}
            </Link>
          ))}
          {/* Conditional Logout Button for Mobile */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center block text-purple-600 text-lg font-bold hover:text-white transition duration-300 py-2 px-4"
            >
              <FaUser className="text-2xl mb-1" /> {/* Icon on top */}
              Logout {/* Title below */}
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-purple-600 text-lg font-bold ring ring-purple-600 ring-sm rounded transition duration-300 ease-in-out hover:text-white px-4 py-2 m-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
