import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/700.css"; // Bold
import "@fontsource/montserrat/400.css"; // Regular
import "@fontsource/montserrat/700.css"; // Bold

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null); // State to store user info
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
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData)); // Set user state after parsing user data
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Clear user state
    navigate("/login"); // Redirect to login
  };

  return (
    <nav
      className={`bg-gray-900 p-4 shadow fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "backdrop-blur-lg bg-gray-900/60" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-purple-600 text-3xl font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? (
              <span>&#10005;</span> // Close icon (X)
            ) : (
              <span>&#9776;</span> // Hamburger icon
            )}
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-purple-600 text-lg font-bold hover:text-white"
          >
            Home
          </Link>
          <Link
            to="#about"
            onClick={() => setIsOpen(false)}
            className="text-purple-600 text-lg font-bold hover:text-white"
          >
            About
          </Link>
          <Link
            to="#blog"
            onClick={() => setIsOpen(false)}
            className="text-purple-600 text-lg font-bold hover:text-white"
          >
            Blog
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="text-purple-600 text-lg font-bold hover:text-white"
          >
            Profile
          </Link>
          <Link
            to="#contact"
            onClick={() => setIsOpen(false)}
            className="text-purple-600 text-lg font-bold hover:text-white"
          >
            Contact
          </Link>
          {/* Conditional Logout Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-purple-600 text-lg font-bold hover:text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-purple-600 text-lg font-bold ring ring-purple-600 ring-sm rounded transition duration-300 ease-in-out hover:bg-purple-600 hover:text-white px-4 py-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-800`}>
        <div className="flex flex-col">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-purple-600 text-lg font-bold hover:text-white py-2 px-4"
          >
            Home
          </Link>
          <Link
            to="#about"
            onClick={() => setIsOpen(false)}
            className="block text-purple-600 text-lg font-bold hover:text-white py-2 px-4"
          >
            About
          </Link>
          <Link
            to="#blog"
            onClick={() => setIsOpen(false)}
            className="block text-purple-600 text-lg font-bold hover:text-white py-2 px-4"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-purple-600 text-lg font-bold hover:text-white py-2 px-4"
          >
            Contact
          </Link>
          
          {/* Conditional Logout Button for Mobile */}
          {user ? (
            <button
              onClick={handleLogout}
              className="block text-purple-600 text-lg font-bold hover:text-white py-2 px-4"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-purple-600 text-lg font-bold ring ring-purple-600 ring-sm rounded transition duration-300 ease-in-out hover:bg-purple-600 hover:text-white px-4 py-2 m-2"
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
