import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar/Navbar";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "",
    content: "",
    imageURL: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/blog");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      setError(error.message);
      notify(error.message); // Show error notification
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);
    newBlog.createdBy = decoded.id; // Set the createdBy field to the user ID

    try {
      if (isEditing) {
        const response = await fetch(`http://localhost:8080/api/blog/${editBlogId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to headers
          },
          body: JSON.stringify(newBlog),
        });

        if (!response.ok) throw new Error("Failed to update blog post");
        notify("Blog post updated successfully!"); // Show success notification
      } else {
        const response = await fetch("http://localhost:8080/api/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to headers
          },
          body: JSON.stringify(newBlog),
        });

        if (!response.ok) throw new Error("Failed to create blog post");
        notify("Blog post created successfully!"); // Show success notification
      }

      await fetchBlogs(); // Refresh the blog list after posting/updating
      setNewBlog({ title: "", category: "", content: "", imageURL: "" }); // Reset form
      setIsEditing(false); // Reset editing state
      setEditBlogId(null); // Reset edit blog ID
    } catch (error) {
      setError(error.message);
      notify(error.message); // Show error notification
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });

      if (!response.ok) throw new Error("Failed to delete blog post");
      notify("Blog post deleted successfully!"); // Show success notification
      await fetchBlogs(); // Refresh the blog list after deletion
    } catch (error) {
      setError(error.message);
      notify(error.message); // Show error notification
    }
  };

  const handleEdit = (blog) => {
    setNewBlog(blog);
    setIsEditing(true);
    setEditBlogId(blog._id);

    // Scroll smoothly to the form section
    document.getElementById("blog-form").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 min-h-screen flex justify-center items-start py-10">
        <div className="max-w-2xl w-full bg-[#ffffff14] p-8 rounded-lg shadow-lg mx-4">
          <h1 className="text-3xl text-white mb-5 text-center">Blogs</h1>
          {loading ? (
            <p className="text-white text-center">Loading blogs...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div>
              <form id="blog-form" onSubmit={handleSubmit} className="mb-5 bg-gray-700 p-4 rounded-lg transition-all duration-300">
                <h2 className="text-xl text-white mb-3">{isEditing ? "Edit Blog Post" : "Create Blog Post"}</h2>
                <input
                  type="text"
                  name="title"
                  value={newBlog.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="p-2 mb-2 w-full rounded bg-gray-800 text-white placeholder-gray-400"
                  required
                />
                <div className="mb-4">
                  <label className="text-white font-semibold mb-2 block">Category:</label>
                  <div className="flex flex-col space-y-2">
                    {['Technology', 'Lifestyle', 'Education', 'Health', 'Travel', 'Food'].map(category => (
                      <label key={category} className="flex items-center text-white cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={newBlog.category === category}
                          onChange={handleChange}
                          className="mr-2 accent-purple-600 focus:ring-purple-500"
                          required
                        />
                        <span className="text-lg">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <textarea
                  name="content"
                  value={newBlog.content}
                  onChange={handleChange}
                  placeholder="Content"
                  className="p-2 mb-2 w-full rounded bg-gray-800 text-white placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  name="imageURL"
                  value={newBlog.imageURL}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="p-2 mb-2 w-full rounded bg-gray-800 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className={`px-4 py-2 ${isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"} text-white rounded transition duration-200 ease-in-out w-full`}
                >
                  {isEditing ? "Update Blog Post" : "Create Blog Post"}
                </button>
              </form>

              <div>
                {blogs.map((blog) => (
                  <div key={blog._id} className="bg-gray-700 p-4 rounded mb-4 shadow-md">
                    <h2 className="text-xl text-white">{blog.title}</h2>
                    <p className="text-gray-400">Category: {blog.category}</p>
                    <p className="text-gray-300">{blog.content}</p>
                    {blog.imageURL && (
                      <img src={blog.imageURL} alt={blog.title} className="mt-2 rounded max-h-40 object-cover" />
                    )}
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition duration-200 ease-in-out"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
