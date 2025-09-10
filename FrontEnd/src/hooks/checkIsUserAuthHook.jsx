import React, { useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const checkUserSession = async () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
};

export default checkUserSession;
