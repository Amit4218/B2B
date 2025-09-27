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
        OR: [
          { sender_id: newId, sender_chatroom_delete: null },
          { receiver_id: newId, receiver_chatroom_delete: null },
        ],
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
        blocked: true,
        sender_chatroom_delete: true,
        receiver_chatroom_delete: true,
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

export const updateUserDetails = async (req, res) => {
  const { description, gst_number, city, state } = req.body;

  const user_id = req.user.user_id;

  try {
    const user = await prisma.users.findUnique({
      where: { user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const updateUser = await prisma.users.update({
      where: {
        user_id: user_id,
      },
      data: {
        city: city || "N/A",
        state: state || "N/A",
        gst_number: gst_number || "N/A",
        description: description || "N/A",
      },
    });

    const {
      password: _,
      google_id,
      is_active,
      created_at,
      updated_at,
      ...safeUser
    } = updateUser;

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

export const deleteLead = async (req, res) => {
  const { lead } = req.body;
  try {
    await prisma.requirements.update({
      where: {
        requirement_id: lead,
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

export const deleteChat = async (req, res) => {
  const roomId = req.params.roomId;
  const id = req.user.user_id;

  try {
    const room = await prisma.chatRoom.findUnique({
      where: {
        room_id: roomId,
      },
    });

    if (room.sender_id === id) {
      await prisma.chatRoom.update({
        where: {
          room_id: roomId,
        },
        data: {
          sender_chatroom_delete: id,
        },
      });
    }

    if (room.receiver_id === id) {
      await prisma.chatRoom.update({
        where: {
          room_id: roomId,
        },
        data: {
          receiver_chatroom_delete: id,
        },
      });
    }

    return res.status(200).json({
      message: "ChatRoom deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "SOmething went wrong",
    });
  }
};

export const blockUserFromChat = async (req, res) => {
  const { userId, roomId, blockUser } = req.body;

  try {
    if (blockUser) {
      await prisma.chatRoom.update({
        where: {
          room_id: roomId,
        },
        data: {
          blocked: userId,
        },
      });
      return res.status(200).json({
        message: "User blocked successfully",
      });
    } else {
      await prisma.chatRoom.update({
        where: {
          room_id: roomId,
        },
        data: {
          blocked: null,
        },
      });
      return res.status(200).json({
        message: "User unblocked successfully",
      });
    }
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
