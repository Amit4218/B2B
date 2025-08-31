import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRouter from "./routes/auth-routes.js";

config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
