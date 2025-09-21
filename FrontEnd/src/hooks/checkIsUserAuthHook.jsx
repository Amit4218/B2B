import { useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function useCheckUserSession() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const User = user || localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!User || !token) {
      navigate("/login");
    }
  }, [user, navigate]);
}
