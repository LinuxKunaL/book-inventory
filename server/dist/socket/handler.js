"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationDeleted = exports.notificationEmitted = void 0;
const student_model_1 = require("../models/student.model");
const notifications_model_1 = require("../models/notifications.model");
const notificationEmitted = async (data, socket) => {
    await notifications_model_1.MNotification.create(data);
    if (data.private) {
        const { school, classStandard, section } = data.private;
        const query = { school };
        if (classStandard) {
            query.classStandard = classStandard;
        }
        if (section) {
            query.section = section;
        }
        const students = await student_model_1.MStudent.find(query).select("_id classStandard section");
        students.map(async (std) => {
            const studentId = std._id.toString();
            socket.to(studentId).emit("receive:notify", data);
            await student_model_1.MStudent.updateOne({ _id: studentId }, { $inc: { notificationCount: 1 } });
        });
        return;
    }
    // if not private
    await student_model_1.MStudent.updateMany({}, { $inc: { notificationCount: 1 } });
    socket.broadcast.emit("receive:notify", data);
};
exports.notificationEmitted = notificationEmitted;
const notificationDeleted = async (notificationId, socket) => {
    await notifications_model_1.MNotification.findByIdAndDelete(notificationId);
    socket.broadcast.emit("receive:delete:notify");
};
exports.notificationDeleted = notificationDeleted;
