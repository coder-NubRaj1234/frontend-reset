import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS SDK
import "@fontsource/roboto"; // Importing Roboto for form fields
import Navbar from './components/Navbar/Navbar';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const About = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [repos, setRepos] = useState([]); // State for repositories
  const [githubData, setGithubData] = useState({}); // State for GitHub profile data

  useEffect(() => {
    // Fetch repositories from GitHub
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/pradipbhatt/repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repos:', error);
        toast.error("⚠️ Failed to fetch repositories.");
      }
    };

    // Fetch GitHub profile data
    const fetchGithubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/pradipbhatt');
        const data = await response.json();
        setGithubData(data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        toast.error("⚠️ Failed to fetch GitHub profile data.");
      }
    };

    fetchRepos();
    fetchGithubData();
  }, []); // Empty dependency array to run only once

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
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-gray-100">Hi, I'm <span className="text-[#634da3]">Pradip Bhatt</span></h2>
              <h3 className="text-2xl text-gray-200">____ Computer Engineering Student</h3>
              <p className="text-gray-50 mt-3">Say Hello!</p>
            </div>

            <h2 className="text-3xl font-semibold text-gray-300 mb-4">About Me</h2>
            <p className="text-gray-100 mb-6">
              I'm Pradip Bhatt, a computer science and engineering student at Far Western University, driven by a passion for hackathons and coding competitions. I've contributed to web projects and explored front-end design while venturing into Python for AI development. Hailing from Nepal's remote Farwest region, I navigate challenges but remain dedicated to coding and collaborative learning.
            </p>
            <p className="text-gray-100 mb-6">
              I recently organized Ideathon 2023 and joined a transformative GitHub field visit. Beyond coding, I find joy in photography, image editing, design, and exploring new horizons. ☂️🌍📸💻
            </p>

            <h2 className="text-3xl font-semibold text-gray-300 mb-4">GitHub Stats</h2>
            <div className="flex justify-around mb-6 text-gray-100">
              <div className="text-center">
                <h4 className="text-2xl">{githubData.public_repos}</h4>
                <p>Repositories</p>
              </div>
              <div className="text-center">
                <h4 className="text-2xl">{githubData.followers}</h4>
                <p>Followers</p>
              </div>
              <div className="text-center">
                <h4 className="text-2xl">{githubData.following}</h4>
                <p>Following</p>
              </div>
              <div className="text-center">
                <h4 className="text-2xl">{githubData.public_gists}</h4>
                <p>Gists</p>
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-300 mb-4">My Projects</h2>
            <div className="mb-4">
              <h3 className="text-2xl text-gray-200">Smart Home Automation</h3>
              <p className="text-gray-100 mb-4">
                A voice-controlled home automation project combines Arduino, Bluetooth, relays, and voice recognition to enable users to control electrical devices with spoken commands. This system enhances convenience and offers advanced home automation capabilities.
                <a href="https://github.com/pradipbhatt/smart-home-automation" target="_blank" rel="noopener noreferrer" className="text-[#634da3] underline"> GitHub</a>
              </p>
            </div>

            <h2 className="text-3xl font-semibold text-gray-300 mb-4">Repositories</h2>
            <ul className="text-gray-100 mb-6 space-y-4">
              {repos.map(repo => (
                <li key={repo.id} className="flex justify-between">
                  <span>{repo.name}</span>
                  <span className="text-gray-500">{new Date(repo.updated_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-semibold text-gray-300 mb-4">Achievements</h2>
            <ul className="text-gray-100 mb-6 space-y-2">
              <li>🏆 Pull Shark x2</li>
              <li>🏆 Quickdraw</li>
              <li>🏆 YOLO</li>
            </ul>

            <h2 className="text-3xl font-semibold text-gray-300 mb-4">Organizations</h2>
            <ul className="text-gray-100 mb-6 space-y-2">
              <li>🎓 @farwest-university</li>
              <li>🎓 @iCEC-FWU</li>
              <li>🎓 @SudurTech</li>
              <li>🎓 @Vidhyalayaa</li>
              <li>🎓 @MCQ-Project</li>
              <li>🎓 @Khatu-team</li>
              <li>🎓 @Team-CELESTIALS</li>
            </ul>

            <h2 className="text-3xl font-semibold text-gray-300 mb-4">Contact Me</h2>
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
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border border-gray-400 p-2 rounded w-full"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border border-gray-400 p-2 rounded w-full"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-white mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="border border-gray-400 p-2 rounded w-full"
                      placeholder="Your Message"
                      rows="4"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading} // Disable button during loading
                    className={`p-2 w-full ${loading ? 'bg-gray-600' : 'bg-teal-900'} text-white font-bold rounded-md shadow-md transition-colors duration-300 ease-in-out hover:bg-gradient-to-r hover:from-teal-800 hover:to-blue-200`}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
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

export default About;
