// src/components/Blogs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import ArticleModal from "./ArticleModal"; // Ensure this import is correct

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // State to hold blog articles
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [selectedBlog, setSelectedBlog] = useState(null); // State for selected blog for modal

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/blog");
        setBlogs(response.data); // Set fetched blogs to state
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false); // Update loading status
      }
    };

    fetchBlogs();
  }, []);

  // Function to open the modal with the selected blog
  const handleShowMore = (blog) => {
    setSelectedBlog(blog);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <Navbar />
      <div className="relative p-4 bg-background overflow-hidden pt-20 bg-gray-900">
        <h1 className="text-3xl font-bold text-center pt-8 text-white bg-background">All Blogs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-background pb-20 pt-10 px-5">
          {loading ? (
            <p className="text-white text-center">Loading blogs...</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 stories-card"
              >
                <div className="overflow-hidden">
                  {blog.imageURL && ( // Adjusted to match the blog image field
                    <img
                      src={blog.imageURL}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </div>
                <div className="p-4 relative pb-14">
                  <h2 className="text-xl font-semibold text-white mb-2">{blog.title}</h2>
                  <h2 className="text-xl font-semibold text-white mb-2">{blog.category}</h2>
                  <p className="text-gray-400 mb-4">
                    {blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content}
                  </p>

                  {/* Button container using flexbox for alignment */}
                  <div className="flex justify-between">
                    {/* Show More / Show Less Button */}
                    <button
                      onClick={() => handleShowMore(blog)} // Open modal with the selected blog
                      className="bg-[#634da3] text-white px-4 py-2 rounded hover:bg-[#533b92] transition"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Render the modal if there is a selected blog */}
        {selectedBlog && (
          <ArticleModal article={selectedBlog} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
};

export default Blogs;
