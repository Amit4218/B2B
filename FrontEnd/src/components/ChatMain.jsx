import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { fetchOldMessages } from "../api/api-user";
import { Input } from "@/components/ui/input";
import { useUser } from "../context/userContext";

function ChatMain() {
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
  const roomId = localStorage.getItem("roomId");
  const roomDetails = JSON.parse(localStorage.getItem("roomDetails"));
  const { user } = useUser();
  const userId = user.user_id;

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const messagesEndRef = useRef(null);

  //  auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!roomId) return;

    const newSocket = io(`${SOCKET_URL}`);
    setSocket(newSocket);

    newSocket.emit("joinRoom", roomId);

    const getMessages = async () => {
      const chatmessage = await fetchOldMessages(roomId);
      setMessages(chatmessage);
    };
    getMessages();

    newSocket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (inputMessage.trim() && socket) {
      socket.emit("message", {
        room_id: roomId,
        content: inputMessage,
        sender_id: userId,
      });
      setInputMessage("");
    }
  };

  return (
    <div className="ml-1 w-[98%] flex flex-col">
      {/* Messages */}
      <div className="h-[79vh] overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isSender = msg.sender_id === userId;
          const username = isSender
            ? user.user_name
            : roomDetails.sender_id === userId
            ? roomDetails.receiver_name
            : roomDetails.sender_name;

          return (
            <div
              key={msg._id || index}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Profile image */}
              {!isSender && (
                <img
                  src={user.avatar}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}

              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 ${
                  isSender ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p className="text-xs font-semibold pb-1">{username}</p>
                <p className="text-sm break-words">{msg.content}</p>
              </div>

              {isSender && (
                <img
                  src={user.avatar}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
        {/* dummy div to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 border-t p-4"
      >
        <Input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatMain;
