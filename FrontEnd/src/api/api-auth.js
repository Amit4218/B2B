import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const loginUser = async (email, password) => {
  // request to login buyer/seller
  // used in login page

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/sign-in`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem("token", token);

      return response.data.User;
    }
    return;
  } catch (error) {
    console.error("Login error:", error);
  }
};

const registerUser = async (email, password) => {
  //  request to register a buyer
  // used in Register page

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/sign-up`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      return response.data.User;
    }
    return;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const registerSeller = async (email, password) => {
  // request to create a seller account

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/sign-up`,
      { email, password, role: "seller" },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem("token", token);

      return response.data.User;
    }
    return;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const updateUserProfile = async (city, state, gst_number, description) => {
  // Updates seller profile

  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/user/update-user`,
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

const sendOtp = async (email, type) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/send-otp`,
      {
        email,
        type,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/verify-otp`,
      {
        email,
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const loginGoogleBuyer = async (google_token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/google-sign-in`,
      {
        token: google_token,
        role: "buyer",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      const { token } = response.data;
      localStorage.setItem("token", token);

      return response.data.User;
    }
  } catch (error) {
    console.error("Login with google buyer Error: ", error.message);
  }
};

const registerGoogleBuyer = async (google_token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/google-sign-in`,
      {
        token: google_token,
        role: "buyer",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      const { token } = response.data;
      localStorage.setItem("token", token);

      return response.data.User;
    }
  } catch (error) {
    console.error("Login with google seller Error: ", error.message);
  }
};

const registerGoogleSeller = async (google_token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/google-sign-in`,
      {
        token: google_token,
        role: "seller",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      const { token } = response.data;
      localStorage.setItem("token", token);

      return response.data.User;
    }
  } catch (error) {
    console.error("register with google seller Error: ", error.message);
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/user/logout`,
      {},
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status == 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("roomDetails");
      localStorage.removeItem("roomId");
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  loginUser,
  registerUser,
  registerSeller,
  updateUserProfile,
  logoutUser,
  loginGoogleBuyer,
  registerGoogleBuyer,
  registerGoogleSeller,
  sendOtp,
  verifyOtp,
};
