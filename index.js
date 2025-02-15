const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (adjust for security)
        methods: ["GET", "POST"]
    }
});

// Serve static files from 'public' directory
app.use(express.static("public"));

// WebSocket connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("offer", (data) => {
        console.log("Received offer");
        socket.broadcast.emit("offer", data);
    });

    socket.on("answer", (data) => {
        console.log("Received answer");
        socket.broadcast.emit("answer", data);
    });

    socket.on("candidate", (data) => {
        console.log("Received ICE candidate");
        socket.broadcast.emit("candidate", data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Use dynamic port for Render deployment
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
