import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";  // Corrected the import path
import Signup from "../components/Signup";  // Assuming you also want to include the signup page

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
