import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS SDK
import "@fontsource/roboto"; // Importing Roboto for form fields
import Navbar from './components/Navbar/Navbar';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when sending

    // Use EmailJS to send the email
    emailjs.send('service_rpl4n2n', 'template_z8orwi3', formData, 'gA2JhY7UkblAK_HIT')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setSubmitted(true); // Set submitted state to true
        setLoading(false); // Reset loading state
      }, (error) => {
        console.error('Failed to send email. Error:', error);
        toast.error("⚠️ Failed to send message.");
        setLoading(false); // Reset loading state
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 relative overflow-hidden pt-0">
        <div className="bg-gray-800 min-h-screen flex justify-center items-start lg:pt-32 w-full pt-20">
          <div className="max-w-2xl w-full px-10 sm:px-10 md:px-10 lg:w-2/3 bg-[#ffffff14] p-8 rounded-lg shadow-lg z-10 relative mt-10 mx-auto">
            {/* Adjusted to use px-10 for sm and md, while keeping w-2/3 for lg */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-100">📬 Get in Touch!</h2>
              <p className="text-gray-50 mt-3">We’d love to hear from you.</p>
            </div>
            {submitted ? (
              <div className="text-center">
                <h3 className="text-2xl text-gray-300 font-semibold mb-2 tracking-wider">Message Received Successfully!</h3>
                <p className="text-gray-100 mb-4 tracking-widest">Thanks for your message, we will get back to you as soon as possible.</p>
                <button
                  onClick={() => setSubmitted(false)} // Reset form on button click
                  className="p-2 w-full bg-teal-900 text-white font-bold rounded-md shadow-md transition-colors duration-300 ease-in-out hover:bg-gradient-to-r hover:from-teal-800 hover:to-blue-200"
                >
                  SEND ANOTHER MESSAGE ➔
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-white mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-white mb-2">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 bg-[#ffffff14] border-[#ffffff14] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#634da3]"
                      rows="4"
                      placeholder="Type your message..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full p-3 bg-[#634da3] text-white font-bold rounded-md shadow-md transition-colors duration-300 ease-in-out hover:bg-[#634da3]"
                  >
                    {loading ? '🔄 Sending...' : 'SEND MESSAGE'} {/* Show loading text */}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Contact;
