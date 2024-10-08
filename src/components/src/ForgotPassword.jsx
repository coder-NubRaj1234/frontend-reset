import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar"; // Ensure you have a Navbar component

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    if (email) {
      try {
        await axios.post("https://pradipblogs-backend.onrender.com/api/forgot-password", { email });
        toast.success("Check your email for a reset link");
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    } else {
      toast.error("Please enter your email.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-black relative overflow-hidden pt-0">
        <div className="bg-black min-h-screen flex justify-center items-start lg:pt-32 w-full pt-20">
          <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 relative mt-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-100">Forgot Password</h2>
              <p className="text-[#ffffff40] mt-3">Enter your email to reset your password</p>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
              />
              <button
                onClick={handleForgotPassword}
                className={`w-full p-3 mt-4 text-white bg-[#634da3] rounded-md focus:outline-none hover:bg-[#634da3]`}
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
