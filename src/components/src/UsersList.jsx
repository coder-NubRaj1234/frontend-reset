import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar"; // Ensure you have a Navbar component

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://pradipblogs-backend.onrender.com/api/users");
        console.log(res.data); // Check the response structure
        setUsers(res.data.data || []); // Set users to res.data.data
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://pradipblogs-backend.onrender.com/api/users/delete/${userId}`);
        setUsers(users.filter(user => user._id !== userId)); // Remove deleted user from state
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  const handleUpdate = (userId) => {
    // Redirect to an update page (you need to create this component)
    // Example: navigate(`/update/${userId}`);
    toast.info("Redirect to the update page for user: " + userId);
  };

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen flex justify-center items-start pt-20">
        <div className="max-w-md bg-[#ffffff14] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-100">Users List</h2>
          <ul className="space-y-4 mt-4">
            {users.length > 0 ? (
              users.map(user => (
                <li key={user._id} className="flex justify-between items-center text-white">
                  <span>
                    {user.userName || user.fname} {user.lastName || user.lname} - {user.email}
                  </span>
                  <div>
                    <button 
                      onClick={() => handleUpdate(user._id)}
                      className="bg-[#634da3] text-white px-2 py-1 rounded-md hover:bg-[#7e6abf] mr-2"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-white">No users found.</li>
            )}
          </ul>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default UsersList;
