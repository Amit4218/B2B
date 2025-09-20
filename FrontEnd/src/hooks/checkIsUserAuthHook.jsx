import React, { useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const checkUserSession = async () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const User = user || localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!User || !token) {
      navigate("/login");
    }
  }, [user]);
};

export default checkUserSession;
