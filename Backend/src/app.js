import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { Server } from "socket.io"; // Import Server from socket.io, not node:http
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";
import { connect } from "node:http2";
import connectToSocket from "./controllers/socketManager.js";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const server = createServer(app);
const io = connectToSocket(server);



app.use(cors());
app.use(express.urlencoded({limit:"40kb, extended:true"}))
app.use(express.json({limit:"40kb"}));



app.get("/", (req, res) => {
  return res.json({ hello: "shivam" });
});



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