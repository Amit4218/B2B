import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetchOldMessages } from "../api/api-user";
import { Input } from "@/components/ui/input";
import { useUser } from "../context/userContext";

function ChatMain() {
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
  const roomId = localStorage.getItem("roomId");
  const { user } = useUser();
  const userId = user.user_id;

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (!roomId) return;

    // connect to backend
    const newSocket = io(`${SOCKET_URL}`);
    setSocket(newSocket);

    // join private room
    newSocket.emit("joinRoom", roomId);

    // fetch old messages

    const getMessages = async () => {
      const chatmessage = await fetchOldMessages(roomId);
      console.log(chatmessage);

      setMessages(chatmessage);
    };
    getMessages();

    // listen for new messages from socket
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
    <div className=" ml-1  w-[98%] ">
      <div className="h-[79vh] overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={msg._id || index}
            className={`flex flex-col space-y-1 ${
              msg.sender_id === userId ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                msg.sender_id === userId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm font-semibold">
                {/* {msg.sender_id === userId ? "" : msg.sender_name} */}
              </p>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
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
