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
    const userData = localStorage.getItem("user");
    // Check if userData exists and is not "undefined" before parsing
    if (token && userData && userData !== "undefined") {
      setUser(JSON.parse(userData)); // Set user state after parsing user data
    }
  };

  // Call fetchUserData to update user state on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

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
      } rounded-[30px] w-2/3 mx-auto`} // Added border radius and width
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-purple-600 text-3xl font-bold">
          <Link to="/">Articles</Link>
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
        <div className="hidden md:flex md:items-center md:gap-8 mx-auto"> {/* Increased gap for spacing */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-purple-600 text-lg font-bold hover:text-white hover:shadow-lg hover:shadow-purple-500 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="#about"
            onClick={() => setIsOpen(false)}
            className="text-purple-600 text-lg font-bold hover:text-white hover:shadow-lg hover:shadow-purple-500 transition duration-300"
          >
            About
          </Link>
          <Link
            to="#blog"
            onClick={() => setIsOpen(false)}
            className="text-purple-600 text-lg font-bold hover:text-white hover:shadow-lg hover:shadow-purple-500 transition duration-300"
          >
            Blog
          </Link>
          <Link
            to="#contact"
            onClick={() => setIsOpen(false)}
            className="text-purple-600 text-lg font-bold hover:text-white hover:shadow-lg hover:shadow-purple-500 transition duration-300"
          >
            Contact
          </Link>
          {/* Conditional Profile Image and Dropdown */}
          {user ? (
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={user.userImage} // Assuming userImage is the path to the image
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 text-white font-bold">{user.fullname}</div>
                  <div className="px-4 py-2 text-gray-400">{user.email}</div>
                  <Link
                    to="/profile"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-800 rounded-[40px] mx-2`}>
        <div className="flex flex-col gap-4"> {/* Increased gap for spacing */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-purple-600 text-lg font-bold hover:text-white hover:shadow-lg hover:shadow-purple-500 transition duration-300 py-2 px-4"
          >
            Home
          </Link>
          <Link
            to="#about"
            onClick={() => setIsOpen(false)}
            className="block text-purple-600 text-lg font-bold hover:text-white hover:shadow-lg hover:shadow-purple-500 transition duration-300 py-2 px-4"
          >
            About
          </Link>
          <Link
            to="#blog"
            onClick={() => setIsOpen(false)}
            className="block text-purple-600 text-lg font-bold hover:text-white hover:shadow-lg hover:shadow-purple-500 transition duration-300 py-2 px-4"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-purple-600 text-lg font-bold hover:text-white hover:shadow-lg hover:shadow-purple-500 transition duration-300 py-2 px-4"
          >
            Contact
          </Link>

          {/* Conditional Logout Button for Mobile */}
          {user ? (
            <button
              onClick={handleLogout}
              className="block text-purple-600 text-lg font-bold hover:text-white hover:shadow-lg hover:shadow-purple-500 transition duration-300 py-2 px-4"
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
