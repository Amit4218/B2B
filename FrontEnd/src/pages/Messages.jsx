import React, { useEffect, useState } from "react";
import { getAllChatRooms } from "../api/api-user";
import ChatMain from "../components/ChatMain";
import { useUser } from "../context/userContext";
import checkUserSession from "../hooks/checkIsUserAuthHook";

function Messages() {
  checkUserSession();
  const [chatRooms, setChatRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const { user } = useUser();
  const roomInLocalStorage = localStorage.getItem("roomId");
  const roomDetails = JSON.parse(localStorage.getItem("roomDetails"));

  useEffect(() => {
    const callChatRoom = async () => {
      const rooms = await getAllChatRooms();
      if (rooms === "TokenExpiredError") {
        navigate("/login");
        toast("Token expired please login again..");
      } else {
        setChatRooms(rooms);
      }
      if (roomInLocalStorage != null) {
        setActiveRoom(roomInLocalStorage);
      }
    };
    callChatRoom();
  }, []);

  const handleOpenChat = (room) => {
    localStorage.setItem("roomId", room.room_id);
    localStorage.setItem("roomDetails", JSON.stringify(room));
    setActiveRoom(room.room_id);
  };

  return (
    <div className="flex flex-col md:flex-row h-[90vh]">
      {/* Sidebar */}
      <div className="w-full md:w-[30%] bg-gray-100 border-b md:border-r md:border-b-0">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Chat Rooms</h2>
          <div className="space-y-2">
            {chatRooms.length > 0 ? (
              chatRooms.map((room) => (
                <div
                  key={room.room_id}
                  className="p-3 bg-white rounded-lg shadow hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOpenChat(room)}
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={
                        user.user_id == roomDetails.sender_id
                          ? roomDetails.receiver_profile_image
                          : roomDetails.sender_profile_image
                      }
                      alt="error"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <h3 className="text-xs">
                      {user.user_id === room.sender_id
                        ? room.receiver_name
                        : room.sender_name}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <p>No chats found ! Try posting a lead... </p>
            )}
          </div>
        </div>
      </div>
      {/* Main content area */}
      <div className="flex-1">
        {activeRoom ? (
          <ChatMain />
        ) : (
          <div className="p-4">
            {chatRooms.length > 0 ? "Select a chat to start messaging" : ""}{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
