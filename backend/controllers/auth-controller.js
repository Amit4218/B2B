import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import generateUniqueName from "../utils/uniqueNameGeneratr.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(404).json({ message: "All feilds must be filled" });
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ token, message: "User login successful", User: user.user_id });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(404).json({ message: "All fields must be filled" });
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (user) {
      return res.status(403).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uniqueUserName = generateUniqueName();

    const newUser = await prisma.users.create({
      data: {
        user_name: uniqueUserName,
        role: role,
        email: email,
        password: hashedPassword,
        google_id: null,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({ token, user: newUser.user_id });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const googleSignIn = async (req, res) => {
  const { data } = req.body;

  console.log(data);

  return res.status(200).json({ message: "Google Sign-In successful", data });
};
