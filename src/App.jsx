// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/src/Signup";
import Login from "./components/src/Login";
import ForgotPassword from "./components/src/ForgotPassword";
import UsersList from "./components/src/UsersList";
import UploadImage from "./components/src/UploadImage";
import Home from "./pages/Home";
import Profile from "./components/src/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
};

export default App;
