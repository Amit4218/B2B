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
