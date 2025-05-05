import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import CompanyDetail from "./pages/CompanyDetail";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./pages/Navbar";

const NotFound = () => (
  <div className="h-screen flex flex-col justify-center items-center text-center">
    <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
    <p className="text-lg">Page Not Found</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
