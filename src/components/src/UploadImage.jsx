import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar"; // Ensure you have a Navbar component

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    if (!image) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("https://pradipblogs-backend.onrender.com/api/upload-image", formData);
      toast.success("Image uploaded successfully");
      console.log("Response:", res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 relative overflow-hidden pt-0">
        <div className="bg-gray-800 min-h-screen flex justify-center items-start lg:pt-32 w-full pt-20">
          <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 relative mt-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-100">Upload Image</h2>
              <p className="text-[#ffffff40] mt-3">Choose an image file to upload</p>
            </div>
            <div className="space-y-4">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
              />
              <button
                onClick={handleImageUpload}
                className={`w-full p-3 mt-4 text-white bg-[#634da3] rounded-md focus:outline-none ${
                  !image ? "opacity-50 cursor-not-allowed" : "hover:bg-[#634da3]"
                }`}
                disabled={!image}
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadImage;
