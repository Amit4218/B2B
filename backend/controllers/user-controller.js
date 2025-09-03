import prisma from "../lib/prisma.js";

export const getUserMessages = async (req, res) => {
  // Gets the chat messages from a specific chatRoom

  const userId = req.params.id;
  try {
    const messages = await prisma.messages.findMany({
      where: { user_id: userId },
    });

    return res
      .status(200)
      .json({ messages, message: "Messages retrieved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const postRequirements = async (req, res) => {
  const userId = req.params.id;
  try {
    // post requirements
    return res
      .status(200)
      .json({ message: "Requirements updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const createChatRoom = async (req, res) => {
  const { sender_id, receiver_id, roomName } = req.body;

  try {
    const chatRoom = await prisma.chatRoom.create({
      data: {
        room_name: roomName,

        // store foreign keys correctly
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

  const id = req.user.id;

  try {
    const chatRooms = await prisma.chatRoom.findMany({
      where: {
        OR: [{ sender_id: id }, { receiver_id: id }],
      },
    });

    return res
      .status(200)
      .json({ chatRooms, message: "Chat rooms retrieved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateSellerDetails = async (req, res) => {
  const { seller_id, description, gst_number } = req.body;

  try {
    const updatedSeller = await prisma.seller.update({
      where: { seller_id },
      data: {
        description,
        gst_number,
      },
    });

    return res.status(200).json({
      message: "Seller details updated successfully",
      seller: updatedSeller,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
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
