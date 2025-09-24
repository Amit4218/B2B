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

function ChatMenu({ userId }) {
  const navigate = useNavigate();
  const roomDetails = JSON.parse(localStorage.getItem("roomDetails"));

  const handelChatDelete = async (roomId) => {
    const room = await deleteChat(roomId);
    if (room === "ChatRoom deleted successfully") {
      toast("Chat Deleted...");
      window.location.reload();
    } else if (room === "TokenExpiredError") {
      navigate("/login");
      toast("Token expired, please login again..");
    } else {
      toast("Something went wrong");
    }
  };

  const handelBlockUser = async (userId, roomId) => {
    const data = await blockUserFromChat(userId, roomId);
    if (data === "User blocked successfully") {
      window.location.reload();
      localStorage.removeItem("roomId");
      toast("User blocked");
    } else {
      toast("Error blocking user!");
    }
  };

  const handelUnblockUser = async (userId, roomId) => {
    let block = false;
    const data = await blockUserFromChat(userId, roomId, block);
    if (data === "User unblocked successfully") {
      localStorage.removeItem("roomId");
      window.location.reload();
      toast("User unblocked..");
    } else {
      toast("Error unblocking user!");
    }
  };

  return (
    <>
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
              onClick={() => {
                handelChatDelete(roomDetails.room_id);
              }}
            >
              Delete Chat
            </Button>
          </DropdownMenuItem>
          {roomDetails?.blocked === null && (
            <DropdownMenuItem className="p-0 my-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  handelBlockUser(userId, roomDetails.room_id);
                }}
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
                onClick={() => {
                  handelUnblockUser(userId, roomDetails.room_id);
                }}
              >
                unblock
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ChatMenu;
