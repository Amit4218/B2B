import prisma from "../lib/prisma.js";

export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ user, message: "User retrieved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getUserMessages = async (req, res) => {
  const userId = req.params.id;
  try {
    const messages = await prisma.message.findMany({
      where: { userId: userId },
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
