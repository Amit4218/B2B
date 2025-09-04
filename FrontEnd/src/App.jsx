import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SellerSignUp from "./pages/SellerSignUp";
import SellerDetailsPage from "./pages/SellerDetailsPage";

function App() {
  return (
    <>
      <Routes>
        {/* No Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller-sign-up" element={<SellerSignUp />} />
        <Route path="/seller-details" element={<SellerDetailsPage />} />

        {/* With Navbar */}
        <Route
          path="*"
          element={
            <div className="max-h-screen overflow-hidden">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
