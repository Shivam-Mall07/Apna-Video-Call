
import {Server } from "socket.io"

// Pass the HTTP server instance to Socket.io
const connectToSocket    = (server) => {
    const io = new Server(server);

    return io;
}

export default connectToSocket;