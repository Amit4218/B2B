import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import BrowseLeads from "./pages/BrowseLeads";
import Profile from "./pages/Profile";
import PostLeads from "./pages/PostLeads";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/*"
            element={
              <div className="flex flex-col flex-1 min-h-0">
                <Navbar />
                <div className="flex-1 min-h-0">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/browse-leads" element={<BrowseLeads />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/post-leads" element={<PostLeads />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                {location.pathname !== "/messages" && <Footer />}
              </div>
            }
          />
        </Routes>
      </div>
      <Toaster theme="system" position="top-right" />
    </>
  );
}

export default App;
