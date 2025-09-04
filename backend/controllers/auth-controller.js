import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import generateUniqueName from "../utils/uniqueNameGeneratr.js";
import googleTokenDecoder from "../utils/googleTokenDecoder.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    let sellerData = null;
    if (user.role === "seller") {
      sellerData = await prisma.seller.findUnique({
        where: { seller_id: user.user_id },
      });
    }

    // creating session for the user

    await prisma.session.create({
      data: { created_at: new Date(), user_id: user.user_id },
    });

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // remove sensitive fields
    const {
      password: _,
      google_id,
      is_active,
      created_at,
      updated_at,
      ...finalUser
    } = user;

    // include seller details if needed
    const safeUser = sellerData
      ? { ...finalUser, seller: sellerData }
      : finalUser;

    return res.status(200).json({
      token,
      message: "User login successful",
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uniqueUserName = generateUniqueName();

    const newUser = await prisma.users.create({
      data: {
        user_name: uniqueUserName,
        role,
        email,
        password: hashedPassword,
        google_id: null,
        created_at: new Date(),
      },
    });

    // If SELLER, create seller record
    if (role === "seller") {
      await prisma.seller.create({
        data: { seller_id: newUser.user_id, created_at: new Date() },
      });
    }

    const {
      password: _,
      google_id,
      is_active,
      created_at,
      updated_at,
      ...finalUser
    } = newUser;

    // create session

    await prisma.session.create({
      data: {
        user_id: newUser.user_id,
        created_at: new Date(),
      },
    });

    const token = jwt.sign(
      { user_id: newUser.user_id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({ token, User: finalUser });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const googleSignIn = async (req, res) => {
  const { token, role } = req.body.data;

  try {
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const { id, email } = googleTokenDecoder(token);

    const uniqueUserName = generateUniqueName();

    let user = await prisma.users.findUnique({
      where: { email },
    });

    if (!id || !email) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (!user) {
      user = await prisma.users.create({
        data: {
          user_name: uniqueUserName,
          email: email,
          google_id: id,
          role: role,
          password: null,
        },
      });
    }

    const jwtToken = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Google Sign-In successful",
      token: jwtToken,
      User: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
