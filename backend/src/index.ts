// src/index.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // ← import cookie-parser
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import { protect } from "./middlewares/auth";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // ← Access-Control-Allow-Credentials: true
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET)); // ← enable reading/writing cookies

// Auth routes
app.use("/api/auth", authRoutes);

// Protected task routes
app.use("/api/tasks", protect);
app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI!).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
