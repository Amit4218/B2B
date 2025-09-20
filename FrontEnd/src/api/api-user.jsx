import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const getLeads = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/get-leads`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return response.data.postedLeads;
  } catch (error) {
    console.error("error fetching leads", error.message);
    if (error.response.data.error === "TokenExpiredError") {
      localStorage.removeItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("roomId");
      return "TokenExpiredError";
    }
  }
};

export const postRequirements = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/requirements`,
      {
        title: data.product_title,
        categorie: data.category,
        description: data.description,
        imageUrl: data.image,
        quantity: data.quantity_needed,
        price: data.price_range,
        city: data.city,
        state: data.state,
        location: data.delivery_location,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    return response.status;
  } catch (error) {
    console.error("Error in posting requirements", error.message);
    if (error.response.data.error === "TokenExpiredError") {
      localStorage.removeItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("roomId");
      return "TokenExpiredError";
    }
  }
};

export const createChatRoom = async (sender_id, reciever_id, room_name) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/create-chatRoom`,
      {
        sender_id: sender_id,
        receiver_id: reciever_id,
        roomName: room_name,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    const roomId = response.data.room_id;
    localStorage.setItem("roomId", roomId);
  } catch (error) {
    console.error("Error creating room", error.message);
    if (error.response.data.error === "TokenExpiredError") {
      localStorage.removeItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("roomId");
      return "TokenExpiredError";
    }
  }
};

export const getAllChatRooms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/get-chatRooms`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    return response.data.chatRooms;
  } catch (error) {
    console.error("Error getting all chatRooms", error.message);
    if (error.response.data.error === "TokenExpiredError") {
      localStorage.removeItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("roomId");
      return "TokenExpiredError";
    }
  }
};

export const fetchOldMessages = async (roomId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/messages/${roomId}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.messages;
  } catch (error) {
    console.error("Error Fetching messages", error.message);
    if (error.response.data.error === "TokenExpiredError") {
      localStorage.removeItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("roomId");
      return "TokenExpiredError";
    }
  }
};
