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

  useEffect(() => {
    const callChatRoom = async () => {
      const rooms = await getAllChatRooms();
      setChatRooms(rooms);
    };
    callChatRoom();
  }, []);

  const handleOpenChat = (room) => {
    localStorage.setItem("roomId", room.room_id);
    setActiveRoom(room.room_id);
  };

  console.log(chatRooms);

  return (
    <div className="flex flex-col md:flex-row h-[90vh]">
      {/* Sidebar */}
      <div className="w-full md:w-[30%] bg-gray-100 border-b md:border-r md:border-b-0">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Chat Rooms</h2>
          <div className="space-y-2">
            {chatRooms.map((room) => (
              <div
                key={room.room_id}
                className="p-3 bg-white rounded-lg shadow hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOpenChat(room)}
              >
                <h3 className="text-sm">
                  {user.user_id === room.sender_id
                    ? room.receiver_name
                    : room.sender_name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main content area */}
      <div className="flex-1">
        {activeRoom ? (
          <ChatMain />
        ) : (
          <div className="p-4">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
}

export default Messages;
