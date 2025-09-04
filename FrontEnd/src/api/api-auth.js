import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const loginUser = async (email, password) => {
  // request to login buyer/seller
  // used in login page

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/sign-in`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { token } = response.data;
    localStorage.setItem("token", token);

    return response.data.User;
  } catch (error) {
    console.error("Login error:", error);
  }
};

const registerUser = async (email, password) => {
  //  request to register a buyer
  // used in Register page

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/sign-up`,
      { email, password, role: "buyer" },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { token } = response.data;
    localStorage.setItem("token", token);

    return response.data.User;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const registerSeller = async (email, password) => {
  // request to create a seller account

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/sign-up`,
      { email, password, role: "seller" },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { token } = response.data;
    localStorage.setItem("token", token);

    return response.data.User;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const UpdateSellerProfile = async (city, state, gst_number, description) => {
  // Updates seller profile

  try {
    const response = await axios.put(
      `${BASE_URL}/user/update-seller`,
      { city, state, gst_number, description },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.User;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const logoutUser = async () => {
  const response = await axios.put(`${BASE_URL}/user/logout`, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  if (response.status == 200) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return response.status;
  }
};

export {
  loginUser,
  registerUser,
  registerSeller,
  UpdateSellerProfile,
  logoutUser,
};
