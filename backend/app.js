import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRouter from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import authTokenmiddleware from "./middleware/auth-middleware.js";

config();

const PORT = process.env.PORT || 5000;
const app = express();

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

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
