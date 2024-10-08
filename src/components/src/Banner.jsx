import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const images = [
    {
      src: "https://pradipbhatt.com.np/medias/parry.jpg",
      title: "Explore the Beauty",
      subtitle: "Discover the wonders of the world.",
    },
    {
      src: "https://pradipbhatt.com.np/medias/parry.jpg",
      title: "Adventure Awaits",
      subtitle: "Join us for an unforgettable journey.",
    },
    {
      src: "https://pradipbhatt.com.np/medias/parry.jpg",
      title: "Unleash Your Potential",
      subtitle: "Transform your dreams into reality.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-800 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out" // Adjusted duration for smoother transition
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative min-w-full">
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-screen object-cover"
              />
              {/* Move content to the bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50 py-4">
                <h2 className="text-4xl font-bold text-white md:text-3xl sm:text-2xl">
                  {image.title}
                </h2>
                <p className="text-lg text-gray-300 mb-4 md:text-base sm:text-sm">
                  {image.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative flex flex-col justify-center items-center h-full">
        <h1 className="text-5xl font-bold text-gray-100 mb-4 pt-10 md:text-4xl text-2xl sm:text-3xl">
          Welcome to my Diary! 💜
        </h1>
        <p className="text-lg text-gray-300 mb-8 md:text-base sm:text-sm">
          Your journey begins here.
        </p>
        <Link
          to="/"
          className="w-64 p-3 text-center text-white bg-[#634da3] rounded-md hover:bg-[#4a3c77] md:w-48 sm:w-36"
        >
          Get Started
        </Link>
        <div className="flex space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-600"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={handlePrevious}
            className="bg-[#634da3] text-white rounded-full p-2 hover:bg-[#4a3c77] md:p-1"
          >
            &#9664; {/* Left Arrow */}
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={handleNext}
            className="bg-[#634da3] text-white rounded-full p-2 hover:bg-[#4a3c77] md:p-1"
          >
            &#9654; {/* Right Arrow */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
