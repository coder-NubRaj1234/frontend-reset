import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const email = location.state?.email; // Get email from location state

  const handleVerifyEmail = async () => {
    setLoading(true);
    
    try {
      const res = await axios.post("https://pradipblogs-backend.onrender.com/api/verify-email", {
        email,
        otp,
      });

      toast.success("✅ Email verified successfully!");
      // Optionally, you can navigate to the login page or dashboard
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
        <p className="text-[#ffffff80] mt-3">
          Please enter the OTP sent to <strong>{email}</strong>
        </p>
        <input
          type="text"
          className="w-full p-3 bg-[#ffffff14] text-white rounded-md mt-4"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerifyEmail}
          className={`w-full p-3 mt-4 text-white bg-[#634da3] rounded-md focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#634da3]"
          }`}
          disabled={loading}
        >
          {loading ? "🔄 Verifying..." : "✅ Verify Email"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;
