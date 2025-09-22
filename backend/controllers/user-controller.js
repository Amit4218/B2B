import prisma from "../lib/prisma.js";

export const getUserMessages = async (req, res) => {
  // Gets the chat messages from a specific chatRoom

  const roomId = req.params.id;
  try {
    const messages = await prisma.messages.findMany({
      where: { room_id: roomId },
    });

    return res
      .status(200)
      .json({ messages: messages, message: "Messages retrieved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const postRequirements = async (req, res) => {
  const userId = req.user.user_id;
  const {
    title,
    categorie,
    description,
    imageUrl,
    quantity,
    price,
    city,
    state,
    location,
  } = req.body;

  try {
    const postLead = await prisma.requirements.create({
      data: {
        product_title: title,
        buyer_id: userId,
        categories: [categorie],
        description,
        reference_image_url:
          Array.isArray(imageUrl) && imageUrl.length > 0 ? imageUrl : [],
        quantity_needed: quantity,
        price_range: price,
        city,
        state,
        delivery_location: location,
        created_at: new Date(),
      },
    });

    return res
      .status(200)
      .json({ message: "Requirements posted successfully", data: postLead });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const createChatRoom = async (req, res) => {
  const { sender_id, receiver_id, roomName } = req.body;

  try {
    const roomAlreadyExists = await prisma.chatRoom.findUnique({
      where: {
        sender_id_receiver_id: {
          sender_id,
          receiver_id,
        },
      },
    });

    if (roomAlreadyExists) {
      return res.status(409).json({
        message: "ChatRoom Already exists",
      });
    }

    const sender = await prisma.users.findUnique({
      where: { user_id: sender_id },
      select: { user_name: true, avatar: true },
    });

    const receiver = await prisma.users.findUnique({
      where: { user_id: receiver_id },
      select: { user_name: true, avatar: true },
    });

    const chatRoom = await prisma.chatRoom.create({
      data: {
        room_name: roomName,
        sender_name: sender?.user_name,
        receiver_name: receiver?.user_name,
        sender_profile_image: sender?.avatar,
        receiver_profile_image: receiver?.avatar,
        sender: { connect: { user_id: sender_id } },
        receiver: { connect: { user_id: receiver_id } },
      },
    });

    return res.status(201).json({
      room_id: chatRoom.room_id,
      message: "Chat room created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getChatRooms = async (req, res) => {
  // gets all the chat rooms for a user

  const id = req.user.user_id;
  const newId = String(id);

  try {
    const chatrooms = await prisma.chatRoom.findMany({
      where: {
        OR: [{ sender_id: newId }, { receiver_id: newId }],
      },
      select: {
        room_id: true,
        sender_id: true,
        receiver_id: true,
        room_name: true,
        sender_name: true,
        receiver_name: true,
        sender_profile_image: true,
        receiver_profile_image: true,
      },
    });

    return res.status(200).json({
      chatRooms: chatrooms,
      message: "Chat rooms retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateSellerDetails = async (req, res) => {
  const { description, gst_number, city, state } = req.body;

  const user_id = req.user.user_id;

  try {
    const user = await prisma.users.findUnique({
      where: { user_id },
      include: { seller: true },
    });

    if (!user || user.role !== "seller") {
      return res.status(404).json({ message: "Seller not found" });
    }

    let updatedSeller;
    if (user.seller) {
      updatedSeller = await prisma.seller.update({
        where: { seller_id: user_id },
        data: { description, gst_number },
      });
    } else {
      // If seller row doesn't exist, create it
      updatedSeller = await prisma.seller.create({
        data: {
          seller_id: user_id,
          description,
          gst_number,
          created_at: new Date(),
        },
      });
    }

    const updatedUser = await prisma.users.update({
      where: { user_id },
      data: { city, state },
    });

    // Merge both
    const mergedUser = {
      ...updatedUser,
      description: updatedSeller.description,
      gst_number: updatedSeller.gst_number,
    };

    // Remove sensitive fields
    const {
      password,
      google_id,
      is_active,
      created_at,
      updated_at,
      ...safeUser
    } = mergedUser;

    return res.status(200).json({
      message: "Seller details updated successfully",
      User: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    await prisma.users.update({
      where: { user_id },
      data: {
        is_active: false,
      },
    });

    return res.status(200).json({ message: "logged out successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllPostedLeads = async (req, res) => {
  try {
    const leads = await prisma.requirements.findMany({
      where: {
        is_deleted: false,
      },
    });

    return res.status(200).json({
      postedLeads: leads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch requirements" });
  }
};

export const getUserLeads = async (req, res) => {
  const id = req.user.user_id;

  try {
    const leads = await prisma.requirements.findMany({
      where: {
        buyer_id: id,
        is_deleted: false,
      },
    });

    return res.status(200).json({
      message: "leads fetched successfull",
      userLeads: leads,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const userProfileInfo = async (req, res) => {
  const { state, city } = req.body;
  const id = req.user.user_id;

  try {
    const newInfo = await prisma.users.update({
      where: {
        user_id: id,
      },
      data: {
        city: city,
        state: state,
      },
    });

    return res.status(200).json({
      message: "info updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "SOmething went wrong",
    });
  }
};

export const deleteLead = async (req, res) => {
  const id = req.user.user_id;
  try {
    const deletedLead = await prisma.requirements.update({
      where: {
        buyer_id: id,
      },
      data: {
        is_deleted: true,
      },
    });

    return res.status(200).json({
      message: "lead deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "SOmething went wrong",
    });
  }
};

export const saveMessage = async (room_id, message, sender_id) => {
  // save the chat room messages
  try {
    await prisma.messages.create({
      data: {
        room_id,
        content: message,
        sender_id,
      },
    });
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to save message");
  }
};
