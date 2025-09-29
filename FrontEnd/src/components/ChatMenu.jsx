import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { blockUserFromChat, deleteChat } from "../api/api-user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function ChatMenu({ userId, onRoomUpdate, clearActiveRoom, roomDetails }) {
  const navigate = useNavigate();
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

  const blockUser = async (roomId, status, userId) => {
    try {
      const socket = io(`${SOCKET_URL}`, { autoConnect: true });

      socket.once("connect", () => {
        socket.emit("block", { roomId, status, userId });
        setTimeout(() => socket.disconnect(), 50);
      });

      socket.once("connect_error", (err) => {
        console.error("Socket connect error (blockUser):", err);
        socket.disconnect();
      });
    } catch (error) {
      console.error("error block", error);
    }
  };

  const handleChatDelete = async (roomId) => {
    const res = await deleteChat(roomId);
    if (res === "ChatRoom deleted successfully") {
      toast("Chat Deleted...");
      clearActiveRoom();
      onRoomUpdate();
    } else if (res === "TokenExpiredError") {
      navigate("/login");
      toast("Token expired, please login again..");
    } else {
      toast("Something went wrong");
    }
  };

  const handleBlockUser = async (userId, roomId) => {
    const res = await blockUserFromChat(userId, roomId);
    if (res === "User blocked successfully") {
      blockUser(roomId, "block", userId);
      toast("User blocked");
      onRoomUpdate();
    } else {
      toast("Error blocking user!");
    }
  };

  const handleUnblockUser = async (userId, roomId) => {
    const res = await blockUserFromChat(userId, roomId, false);
    if (res === "User unblocked successfully") {
      blockUser(roomId, "unblock", userId);
      toast("User unblocked");
      onRoomUpdate();
    } else {
      toast("Error unblocking user!");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem className="p-0 my-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => handleChatDelete(roomDetails.room_id)}
          >
            Delete Chat
          </Button>
        </DropdownMenuItem>

        {roomDetails?.blocked === null && (
          <DropdownMenuItem className="p-0 my-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleBlockUser(userId, roomDetails.room_id)}
            >
              Block
            </Button>
          </DropdownMenuItem>
        )}

        {roomDetails?.blocked !== null && (
          <DropdownMenuItem className="p-0 my-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleUnblockUser(userId, roomDetails.room_id)}
            >
              Unblock
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ChatMenu;
