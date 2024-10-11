import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar"; // Ensure you have a Navbar component
import { useNavigate } from "react-router-dom";
import eye from "../../../public/eye.png"; // Import eye image
import eyeclose from "../../../public/eyeclose.png"; // Import eye close image

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const validateInputs = () => {
    return fullname.trim() !== "" && email.trim() !== "" && password.trim() !== "";
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
  
    if (validateInputs()) {
      try {
        const res = await axios.post("https://pradipblogs-backend.onrender.com/api/register", {
          fullname,
          email,
          password,
        });
  
        toast.success("✅ Account Created Successfully! Please check your email for a confirmation link to verify your account.", {
          autoClose: 5000, // 5-second toast duration
        });
        console.log("Response:", res.data);
  
        // Navigate to login page after a short delay to allow the toast to be seen
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Adjust the timeout duration as needed
      } catch (err) {
        toast.error(err.response?.data?.message || "An error occurred during signup. Please try again.", {
          autoClose: 5000, // 5-second toast duration
        });
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      toast.error("⚠️ Please fill in all fields.", {
        autoClose: 5000, // 5-second toast duration
      });
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-purple-800 to-blue-900 relative overflow-hidden pt-0">
        <div className="bg-gray-900 min-h-screen flex justify-center items-start lg:pt-32 w-full pt-20">
          <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 relative mt-10">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-gray-100">
                {["C", "r", "e", "a", "a", "t", "e", " ", "N", "e", "w", " ", "A", "c", "c", "o", "u", "n", "t"].map((letter, index) => (
                  <span key={index} className={`wave-text`} style={{ display: "inline-block" }}>
                    {letter}
                  </span>
                ))}
              </h2>
              <p className="text-[#ffffff80] mt-3">Please enter your details to create a new account</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                placeholder="👤 Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="email"
                className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                placeholder="✉️ Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"} // Change input type based on visibility
                  className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                  placeholder="🔒 Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <img 
                    src={passwordVisible ? eye : eyeclose} // Show/hide eye image based on visibility
                    alt="Toggle Password Visibility" 
                    className="w-6 h-6"
                  />
                </button>
              </div>
              <button
                onClick={handleSignUp}
                disabled={buttonDisabled}
                className={`w-full p-3 mt-4 text-white bg-[#634da3] rounded-md focus:outline-none ${
                  buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#634da3]"
                }`}
              >
                {loading ? "🔄 Signing Up..." : "✨ Sign Up"}
              </button>
              <div className="mt-4 text-center">
                <p className="text-[#ffffff40]">Already have an account? 🤔</p>
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#634da3] hover:underline focus:outline-none"
                >
                  🔑 Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={10000} /> {/* Set global toast duration to 5 seconds */}
      <style>
        {`
          @keyframes wave {
            0%, 100% {
              transform: translateY(0);
            }
            25% {
              transform: translateY(-5px);
            }
            50% {
              transform: translateY(5px);
            }
            75% {
              transform: translateY(-3px);
            }
          }

          .wave-text {
            display: inline-block;
            animation: wave 1.5s forwards; /* Run animation once */
            animation-delay: calc(0.1s * var(--i)); /* Add a delay for each letter */
            background: linear-gradient(45deg, #634da3, #d34eb1, #c2d2e1); /* Gradient background */
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; /* Fill color transparent for gradient */
            background-clip: text;
          }

          /* Set individual delay for each letter */
          .wave-text:nth-child(1) { --i: 0; }
          .wave-text:nth-child(2) { --i: 1; }
          .wave-text:nth-child(3) { --i: 2; }
          .wave-text:nth-child(4) { --i: 3; }
          .wave-text:nth-child(5) { --i: 4; }
          .wave-text:nth-child(6) { --i: 5; }
          .wave-text:nth-child(7) { --i: 6; }
          .wave-text:nth-child(8) { --i: 7; }
          .wave-text:nth-child(9) { --i: 8; }
          .wave-text:nth-child(10) { --i: 9; }
          .wave-text:nth-child(11) { --i: 10; }
          .wave-text:nth-child(12) { --i: 11; }
          .wave-text:nth-child(13) { --i: 12; }
          .wave-text:nth-child(14) { --i: 13; }
        `}
      </style>
    </>
  );
};

export default Signup;
