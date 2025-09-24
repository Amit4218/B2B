import React, { useEffect, useState } from "react";
import { getAllChatRooms } from "../api/api-user";
import ChatMain from "../components/ChatMain";
import { useUser } from "../context/userContext";
import checkUserSession from "../hooks/checkIsUserAuthHook";
import ChatMenu from "../components/ChatMenu";

function Messages() {
  checkUserSession();
  const [chatRooms, setChatRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const { user } = useUser();
  const roomInLocalStorage = localStorage.getItem("roomId");

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
                  className={`p-1 rounded-lg shadow cursor-pointer  ${
                    activeRoom === room.room_id
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleOpenChat(room)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        user.user_id == room.sender_id
                          ? room.receiver_profile_image
                          : room.sender_profile_image
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <h3 className="flex-1 font-medium text-gray-800">
                      {user.user_id === room.sender_id
                        ? room.receiver_name
                        : room.sender_name}
                    </h3>
                    <div className="right-0">
                      <ChatMenu
                        userId={
                          room.sender_id !== user.user_id
                            ? room.sender_id
                            : room.receiver_id
                        }
                        className="text-gray-400 hover:text-gray-600 absolute"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No chats found! Try posting a lead...
              </p>
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
