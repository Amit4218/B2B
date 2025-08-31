import express from "express";
import { googleSignIn, signIn, signUp } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/google-sign-in", googleSignIn);

// router.post("/logout", logout);

export default router;
