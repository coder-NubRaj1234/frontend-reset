// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Navbar from "../components/src/components/Navbar/Navbar.jsx"; // Ensure you have a Navbar component
import Banner from "../components/src/Banner.jsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner/>
    </>
  );
};

export default Home;
