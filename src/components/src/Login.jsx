// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import eye from "../../../public/eye.png";
import eyeclose from "../../../public/eyeclose.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { AiOutlineGoogle } from "react-icons/ai";
import { jwtDecode } from "jwt-decode"; // Use jwt-decode directly

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const username = decoded.name || "User";
      const isAdmin = decoded.isAdmin;

      // Show notification based on user role
      if (isAdmin) {
        toast.success("Hello sir, welcome back!");
      } else {
        toast.success(`Hello ${username}, welcome back!`);
      }

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => email && password;

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const res = await axios.post("https://pradipblogs-backend.onrender.com/api/login", {
          email,
          password,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        const username = decoded.username || "User";
        const isAdmin = decoded.isAdmin;

        // Show notification based on user role
        if (isAdmin) {
          toast.success("Hello sir, welcome back!");
        } else {
          toast.success(`Hello ${username}, welcome back!`);
        }

        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      toast.error("⚠️ Please fill in all fields.");
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex justify-center items-center lg:pt-32 pt-16">
        <div className="bg-[#ffffff14] backdrop-blur-md p-10 rounded-lg shadow-lg w-full max-w-md z-10 pt-10 ">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold">
              {["W", "e", "l", "c", "o", "m", "e", " ", "B", "a", "c", "k"].map((letter, index) => (
                <span key={index} className={`wave-text`} style={{ display: "inline-block" }}>
                  {letter}
                </span>
              ))}
            </h2>
            <p className="text-[#ffffff80] mt-3">Please login with your details here</p>
          </div>
          <div className="space-y-4">
            <input
              type="email"
              className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
              placeholder="✉️ Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
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
                <img src={passwordVisible ? eye : eyeclose} alt="Toggle Password Visibility" className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={handleSignIn}
              disabled={buttonDisabled}
              className="relative w-full py-3 text-purple-600 border border-purple-600 rounded-md transition-all duration-300 ease-in-out transform hover:bg-purple-600 hover:text-white 
                hover:shadow-[0px 5px 15px rgba(255, 77, 255, 0.5)] focus:outline-none"
            >
              {loading ? "🔄 Signing In..." : "✨ Sign In"}
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 mt-4 flex items-center justify-center text-white bg-[#db4437] rounded-md transition-all duration-300 ease-in-out hover:bg-[#c23321] 
                hover:shadow-[0px 5px 15px rgba(255, 77, 255, 0.5)] focus:outline-none"
            >
              <AiOutlineGoogle className="mr-2" size={20} />
              Continue with Google
            </button>
            <div className="mt-4 text-center">
              <button onClick={() => navigate("/forgot-password")} className="text-[#634da3] hover:underline focus:outline-none">
                🔑 Forgot Password?
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-[#ffffff80]">Don't have an account? 🤔</p>
              <button onClick={() => navigate("/signup")} className="text-[#634da3] hover:underline focus:outline-none">
                ✨ Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-5px); }
            50% { transform: translateY(5px); }
            75% { transform: translateY(-3px); }
          }

          .wave-text {
            display: inline-block;
            animation: wave 3s forwards;
            animation-delay: calc(0.1s * var(--i));
            background: linear-gradient(45deg, #634da3, #d34eb1, #c2d2e1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

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
        `}
      </style>
    </>
  );
};

export default Login;
