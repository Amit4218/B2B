import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";
import authRouter from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import authTokenmiddleware from "./middleware/auth-middleware.js";
import { saveMessage } from "./controllers/user-controller.js";

config();

const PORT = process.env.PORT || 5000;
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", (room_id) => {
    socket.join(room_id);
  });

  socket.on("message", ({ room_id, message, sender_id }) => {
    saveMessage(room_id, message, sender_id);
    socket.to(room_id).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authTokenmiddleware, userRoutes);

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
