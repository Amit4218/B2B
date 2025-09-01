import express from "express";
import {
  getUser,
  getUserMessages,
  postRequirements,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/:id", getUser);

router.get("/:id/messages", getUserMessages);

router.post("/requirements", postRequirements);

export default router;
