import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const getLeads = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/get-leads`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return response.data.postedLeads;
  } catch (error) {
    console.error("error fetching leads");
  }
};

export const postRequirements = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/requirements`,
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
  }
};

export const createChatRoom = async (sender_id, reciever_id, room_name) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/create-chatRoom`,
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
  }
};

export const getAllChatRooms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/get-chatRooms`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    console.log(response.data);
    return response.data.chatRooms;
  } catch (error) {
    console.error("Error getting all chatRooms", error.message);
  }
};

export const fetchOldMessages = async (roomId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/messages/${roomId}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    return response.data.messages;

  } catch (error) {
    console.error("Error Fetching messages", error.message);
  }
};
