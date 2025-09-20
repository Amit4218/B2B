import express from "express";
import {
  googleSignIn,
  signIn,
  signUp,
  updateExpiredUserSession,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/google-sign-in", googleSignIn);

router.post("/update-expired-user", updateExpiredUserSession);

export default router;
