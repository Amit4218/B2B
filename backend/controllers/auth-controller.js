import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import generateUniqueName from "../utils/uniqueNameGeneratr.js";
import googleTokenDecoder from "../utils/googleTokenDecoder.js";
import { generateOtp, isOtpExpired } from "../utils/generateOtp.js";
import { sendEmailNodeMailer } from "../utils/resendEmail.js";

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

    return res.status(200).json({
      token,
      message: "User login successful",
      User: finalUser,
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
    const { email, password } = req.body;

    if (!email || !password) {
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
        avatar: `https://placehold.co/400?text=${uniqueUserName}&font=roboto`,
        email,
        password: hashedPassword,
        google_id: null,
        created_at: new Date(),
      },
    });

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

    const {
      password: _,
      google_id,
      is_active,
      created_at,
      updated_at,
      ...finalUser
    } = newUser;

    return res.status(201).json({ token, User: finalUser });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const googleSignIn = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const { id, email } = googleTokenDecoder(token);

    if (!id || !email) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const uniqueUserName = generateUniqueName();

    let user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.users.create({
        data: {
          user_name: uniqueUserName,
          avatar: `https://placehold.co/400?text=${uniqueUserName}&font=roboto`,
          email: email,
          google_id: id,
          password: null,
          created_at: new Date(),
        },
      });
    }

    const {
      password: _,
      google_id,
      is_active,
      created_at,
      updated_at,
      ...finalUser
    } = user;

    // create session

    await prisma.session.create({
      data: {
        user_id: user.user_id,
        created_at: new Date(),
      },
    });

    const jwtToken = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({ token: jwtToken, User: finalUser });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const SendOtpEmail = async (req, res) => {
  const { email, type } = req.body;

  try {
    if (!email) {
      return res.status(404).json({
        message: "Email is required",
      });
    }

    if (type === "send") {
      const otp = generateOtp();

      const existing = await prisma.otp.findUnique({
        where: {
          email,
        },
      });

      if (existing) {
        await prisma.otp.delete({
          where: {
            email,
          },
        });
      }

      await prisma.otp.create({
        data: {
          email,
          code: otp,
          created_at: new Date(),
        },
      });

      await sendEmailNodeMailer(email, otp);

      return res.status(200).json({
        message: "otp sent to email",
      });
    }

    if (type === "resend") {
      const existingOtp = await prisma.otp.findUnique({
        where: {
          email,
        },
      });

      // checks user otp time : 60 sec

      if (isOtpExpired(existingOtp.created_at)) {
        const otp = generateOtp();

        await prisma.otp.update({
          where: {
            email,
          },
          data: {
            code: otp,
          },
        });

        await sendEmailNodeMailer(email, otp);

        return res.status(200).json({
          message: "otp sent successfully",
        });
      }

      return res.status(500).json({
        message: "otp has already been sent.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otp) {
      return res.status(404).json({
        message: "otp is required",
      });
    }

    const existingOtp = await prisma.otp.findUnique({
      where: {
        email,
      },
      select: {
        code: true,
      },
    });

    if (!existingOtp) {
      return res.status(404).json({
        message: "otp not found",
      });
    }

    if (existingOtp.code === Number(otp)) {
      await prisma.otp.delete({
        where: {
          email,
        },
      });

      return res.status(200).json({
        message: "email verified",
      });
    }

    return res.status(500).json({
      message: "invalid otp",
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const updateExpiredUserSession = async (req, res) => {
  const user_id = req.body;
  try {
    await prisma.session.update({
      where: {
        user_id: user_id,
      },
      data: {
        updated_at: new Date(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating expired user session",
    });
  }
};
