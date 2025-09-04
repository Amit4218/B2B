import express from "express";
import {
  createChatRoom,
  getChatRooms,
  getUserMessages,
  logout,
  postRequirements,
  updateSellerDetails,
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/create-chatRoom", createChatRoom);

router.get("/messages/:id", getUserMessages);

router.get("/get-chatRooms", getChatRooms);

router.post("/requirements", postRequirements);

router.put("/update-seller", updateSellerDetails);

router.put("/logout", logout);

export default router;
