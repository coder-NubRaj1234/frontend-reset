import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import eye from "../../../public/eye.png";
import eyeclose from "../../../public/eyeclose.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { AiOutlineGoogle } from "react-icons/ai"; // Import Google icon

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
      toast.success("✅ Google Login Successful");
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
        toast.success("✅ Login Successful");
        localStorage.setItem("token", res.data.token);
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
      <div className="bg-gray-800 relative overflow-hidden pt-0">
        <div className="bg-gray-800 min-h-screen flex justify-center items-start lg:pt-32 w-full pt-20">
          <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 relative mt-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-100">Welcome Back! 💜</h2>
              <p className="text-[#ffffff40] mt-3">Please login with your details here</p>
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
                className={`w-full p-3 mt-4 text-white bg-[#634da3] rounded-md focus:outline-none ${
                  buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#634da3]"
                }`}
              >
                {loading ? "🔄 Signing In..." : "✨ Sign In"}
              </button>
              {/* Google Sign-In Button */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full p-3 mt-4 flex items-center justify-center text-white bg-[#db4437] rounded-md focus:outline-none hover:bg-[#c23321]"
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
                <p className="text-[#ffffff40]">Don't have an account? 🤔</p>
                <button onClick={() => navigate("/signup")} className="text-[#634da3] hover:underline focus:outline-none">
                  ✨ Sign Up
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
