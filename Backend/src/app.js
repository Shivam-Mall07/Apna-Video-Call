import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js"; // Standard path for user routes—adjust if needed

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const server = createServer(app);

// Initialize Socket.io
const io = connectToSocket(server);

// Middleware
app.use(cors());
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use(express.json({ limit: "40kb" }));

// Routes
app.use("/api/sm/users", userRoutes);

// Database Connection & Server Start
const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${connectionDb.connection.host}`);

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
};

start();