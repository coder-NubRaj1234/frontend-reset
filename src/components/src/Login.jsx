import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar"; // Ensure you have a Navbar component
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    return email && password;
  };

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const res = await axios.post("https://pradipblogs-backend.onrender.com/api/login", {
          email,
          password,
        });
        toast.success("Login Success");
        console.log("Response:", res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/"); // Redirect after successful login
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      toast.error("Please fill in all fields.");
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const handleResetPassword = () => {
    navigate("/forgot-password"); // Redirect to the reset password page
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <>
      <Navbar />
      <div className="bg-black relative overflow-hidden pt-0">
        <div className="bg-black min-h-screen flex justify-center items-start lg:pt-32 w-full pt-20">
          <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 relative mt-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-100">Welcome Back! 💜</h2>
              <p className="text-[#ffffff40] mt-3">Please login with your details here</p>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleSignIn}
                disabled={buttonDisabled}
                className={`w-full p-3 mt-4 text-white bg-[#634da3] rounded-md focus:outline-none ${
                  buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#634da3]"
                }`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
              <div className="mt-4 text-center">
                <button
                  onClick={handleResetPassword}
                  className="text-[#634da3] hover:underline focus:outline-none"
                >
                  Forgot Password
                </button>
              </div>
              {/* Add a prompt for users to sign up */}
              <div className="mt-4 text-center">
                <p className="text-[#ffffff40]">Don't have an account?</p>
                <button
                  onClick={handleSignupRedirect}
                  className="text-[#634da3] hover:underline focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
