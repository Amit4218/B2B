import express from "express";
import {
  googleSignIn,
  SendOtpEmail,
  signIn,
  signUp,
  updateExpiredUserSession,
  verifyOtp,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/google-sign-in", googleSignIn);

router.post("/send-otp", SendOtpEmail);

router.post("/verify-otp", verifyOtp);

router.post("/update-expired-user", updateExpiredUserSession);

export default router;
