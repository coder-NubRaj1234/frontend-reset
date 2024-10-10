import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar"; // Ensure you have a Navbar component
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import Dashboard from "./Dashboard";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user's info
  const [isEditing, setIsEditing] = useState(false); // State to toggle the update form
  const [editUser, setEditUser] = useState(null); // State to hold the user being edited

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const decodedToken = jwtDecode(token);
          setCurrentUser(decodedToken);
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const res = await axios.get("https://pradipblogs-backend.onrender.com/api/users", config);
        console.log(res.data);
        setUsers(res.data.data || []);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        await axios.delete("https://pradipblogs-backend.onrender.com/api/users/delete", {
          headers: { Authorization: `Bearer ${token}` },
          data: { userid: userId },
        });

        // Fetch the updated user list after deletion
        fetchUsers();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.put(
        `https://pradipblogs-backend.onrender.com/api/users/update/${editUser._id}`,
        editUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Update the user list with the new user data
      setUsers(users.map(user => (user._id === editUser._id ? response.data : user)));
      
      toast.success("User updated successfully");
      setIsEditing(false);
      setEditUser(null);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  
  
  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex justify-center items-start pt-20">
        <div className="max-w-3xl w-full bg-[#ffffff14] p-8 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-4xl font-bold text-gray-100 text-center mb-6">Users List</h2>
          {currentUser && (
            <div className="mb-4 text-gray-300">
              <p>Logged in as: {currentUser.username || currentUser.userName || currentUser.email}</p>
              <p>Role: {currentUser.isAdmin ? "Admin" : "User"}</p>
            </div>
          )}

          {/* Update Form */}
          {isEditing && editUser && (
            <form onSubmit={handleUpdate} className="mb-6">
              <h3 className="text-2xl text-gray-100 mb-4">Update User</h3>
              <div className="mb-4">
                <label className="text-gray-300">Full Name:</label>
                <input
                  type="text"
                  value={editUser.fullname || ''}
                  onChange={(e) => setEditUser({ ...editUser, fullname: e.target.value })}
                  className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-300">Email:</label>
                <input
                  type="email"
                  value={editUser.email || ''}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-300">Password:</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                  className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-300">Admin Status:</label>
                <select
                  value={editUser.isAdmin !== undefined ? editUser.isAdmin : false}
                  onChange={(e) => setEditUser({ ...editUser, isAdmin: e.target.value === 'true' })}
                  className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
                >
                  <option value="false">User</option>
                  <option value="true">Admin</option>
                </select>
              </div>
              <button type="submit" className="bg-[#634da3] text-white px-4 py-2 rounded-md">
                Update
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
            </form>
          )}

          {/* Users Table */}
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4">Full Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-600">
                    <td className="py-2 px-4">{user.fullname || `${user.userName || user.fname} ${user.lastName || user.lname}`}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.isAdmin ? "Admin" : "User"}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="bg-[#634da3] text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#7e6abf]"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-2">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <ToastContainer />
        </div>
      </div>
      <Dashboard/>
    </>
  );
};

export default UsersList;
