import http from "http";
import { Server, Socket } from "socket.io";
import { notificationDeleted, notificationEmitted } from "./handler";
import { MStudent } from "../models/student.model";

export default function initSocket(server: http.Server): Server {
  const activeSockets = {};

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const setSocketToStudent = async (socket: Socket) => {
    try {
      const studentId = socket.handshake.query.student;
      if (
        studentId != "undefined" &&
        studentId != null &&
        studentId != undefined
      ) {
        socket.join(studentId);
        console.log(`Student ${studentId} connected and joined room.`);
      }
    } catch (error) {
      console.log(error, "- in setSocketToStudent");
    }
  };

  io.on("connection", (socket) => {
    setSocketToStudent(socket);
    socket.on("emit:notify", (data) => notificationEmitted(data, socket));
    socket.on("delete:notify", (data) => notificationDeleted(data, socket));
  });

  return io;
}
