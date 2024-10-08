import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar"; // Correct the path if necessary
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [userImage, setUserImage] = useState("https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png");

  const validateInputs = () => {
    return fullname && email && password && registrationNumber && userImage;
  };

  const checkIfAccountExists = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/check-email/${email}`);
      return res.data.exists; // Assuming your backend returns an object with an 'exists' property
    } catch (err) {
      console.error("Error checking account existence:", err);
      return false; // If there's an error, we assume the account does not exist
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      const accountExists = await checkIfAccountExists();
      if (accountExists) {
        toast.error("An account with this email already exists.");
        setLoading(false);
        setButtonDisabled(false);
        return;
      }

      try {
        const res = await axios.post("http://localhost:8080/api/signup", {
          fullname,
          email,
          password,
          registrationNumber,
          userImage,
        });
        toast.success("Account Created Successfully");
        console.log("Response:", res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/"); // Redirect after successful signup
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

  return (
    <>
      <Navbar />
      <div className="bg-black relative overflow-hidden">
        <div className="bg-black min-h-screen flex justify-center items-start lg:pt-32 w-full pt-4">
          <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 relative mt-0">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-100">Create New Account 👋</h2>
              <p className="text-[#ffffff40] mt-3">Please enter your details to create a new account</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
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
              <input
                type="text"
                className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                placeholder="Registration Number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
              <input
                type="url"
                className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                placeholder="User Image URL"
                value={userImage}
                onChange={(e) => setUserImage(e.target.value)}
              />
              <button
                onClick={handleSignUp}
                disabled={buttonDisabled}
                className={`w-full p-3 mt-4 text-white bg-[#634da3] rounded-md focus:outline-none ${
                  buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#634da3]"
                }`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              {/* Add a button to navigate to the Signup route if the account exists */}
              <div className="mt-4 text-center">
                <p className="text-[#ffffff40]">Already have an account?</p>
                <button
                  onClick={() => navigate('/login')}
                  className="text-[#634da3] hover:underline focus:outline-none"
                >
                  Log In
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

export default Signup;
