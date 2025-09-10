import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SellerSignUp from "./pages/SellerSignUp";
import SellerDetailsPage from "./pages/SellerDetailsPage";
import { Toaster } from "sonner";
import BrowseLeads from "./pages/BrowseLeads";
import Profile from "./pages/Profile";
import PostLeads from "./pages/PostLeads";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-sign-up" element={<SellerSignUp />} />
        <Route path="/seller-details" element={<SellerDetailsPage />} />

        <Route
          path="/*"
          element={
            <div className="max-h-screen">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/browse-leads" element={<BrowseLeads />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/post-leads" element={<PostLeads />} />
              </Routes>
            </div>
          }
        />
      </Routes>
      <Toaster theme="system" position="top-right" />
    </>
  );
}

export default App;
