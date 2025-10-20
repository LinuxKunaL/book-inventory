import { Socket } from "socket.io";
import { MStudent } from "../models/student.model";
import { MNotification } from "../models/notifications.model";

type TNotification = {
  type: string;
  message: string;
  private: {
    school: string;
    classStandard: string;
    section: string;
  };
  link: string;
  course: string;
  quiz: string;
};

type TQuery = {
  school: string;
  classStandard: string;
  section: string;
};

export const notificationEmitted = async (
  data: TNotification,
  socket: Socket
) => {
  await MNotification.create(data);

  if (data.private) {
    const { school, classStandard, section } = data.private;
    const query = { school } as TQuery;

    if (classStandard) {
      query.classStandard = classStandard;
    }

    if (section) {
      query.section = section;
    }

    const students = await MStudent.find(query).select(
      "_id classStandard section"
    );

    students.map(async (std) => {
      const studentId = std._id.toString();

      socket.to(studentId).emit("receive:notify", data);
      await MStudent.updateOne(
        { _id: studentId },
        { $inc: { notificationCount: 1 } }
      );
    });
    return;
  }
  // if not private
  await MStudent.updateMany({}, { $inc: { notificationCount: 1 } });
  socket.broadcast.emit("receive:notify", data);
};

export const notificationDeleted = async (
  notificationId: string,
  socket: Socket
) => {
  await MNotification.findByIdAndDelete(notificationId);

  socket.broadcast.emit("receive:delete:notify");
};
