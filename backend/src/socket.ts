import { Server, Socket } from "socket.io";
import prisma from "./config/db.config";
import { produceMessage } from "./helper";

interface customSocket extends Socket {
  room?: string;
}

export const setupSocket = async (io: Server) => {
  io.use((socket: customSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: customSocket) => {
    console.log("socket connected", socket.id);

    socket.join(socket.room!);

    socket.on("message", async (message) => {
      console.log("message " + message + " socketid: " + socket.id);
      // socket.broadcast.emit("message", message);
      await produceMessage("chat-app", message);
      socket.to(socket.room!).emit("message", message);
    });

    socket.on("disconnect", (reason, details) => {
      console.log("socket disconnected");
      console.log(reason);
    });
  });
};
