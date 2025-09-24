import express from "express";
import {
  blockUserFromChat,
  createChatRoom,
  deleteChat,
  deleteLead,
  getAllPostedLeads,
  getChatRooms,
  getUserLeads,
  getUserMessages,
  logout,
  postRequirements,
  updateSellerDetails,
  userProfileInfo,
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/create-chatRoom", createChatRoom);

router.get("/messages/:id", getUserMessages);

router.get("/get-chatRooms", getChatRooms);

router.post("/requirements", postRequirements);

router.put("/update-seller", updateSellerDetails);

router.get("/get-leads", getAllPostedLeads);

router.get("/all-posted-leads", getUserLeads);

router.put("/update-info", userProfileInfo);

router.put("/delete-lead", deleteLead);

router.put("/delete-chatRoom/:roomId", deleteChat);

router.put("/block-user", blockUserFromChat)

router.put("/logout", logout);

export default router;
