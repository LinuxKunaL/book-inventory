"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initSocket;
const socket_io_1 = require("socket.io");
const handler_1 = require("./handler");
function initSocket(server) {
    const activeSockets = {};
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    const setSocketToStudent = async (socket) => {
        try {
            const studentId = socket.handshake.query.student;
            if (studentId != "undefined" &&
                studentId != null &&
                studentId != undefined) {
                socket.join(studentId);
                console.log(`Student ${studentId} connected and joined room.`);
            }
        }
        catch (error) {
            console.log(error, "- in setSocketToStudent");
        }
    };
    io.on("connection", (socket) => {
        setSocketToStudent(socket);
        socket.on("emit:notify", (data) => (0, handler_1.notificationEmitted)(data, socket));
        socket.on("delete:notify", (data) => (0, handler_1.notificationDeleted)(data, socket));
    });
    return io;
}
