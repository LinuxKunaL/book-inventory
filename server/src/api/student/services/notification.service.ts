import httpCode from "http-status-codes";
import { TFilterQuery } from "../student.type";
import { AppError } from "../../../utils/Error/AppError";
import { MNotification } from "../../../models/notifications.model";
import { MStudent } from "../../../models/student.model";
import { Request } from "express";

const getNotifications = async (
  query: TFilterQuery["course"],
  student: Request["student"]
) => {
  const page = query.page || 1;

  try {
    const result = await MNotification.find({
      $or: [
        { private: { $exists: false } },
        { private: null },
        {
          private: { $exists: true },
          $and: [
            {
              $or: [
                { "private.school": { $exists: false } },
                { "private.school": student.school },
              ],
            },
            {
              $or: [
                { "private.classStandard": { $exists: false } },
                { "private.classStandard": student.classStandard },
              ],
            },
            {
              $or: [
                { "private.section": { $exists: false } },
                { "private.section": student.section },
              ],
            },
          ],
        },
      ],
    })
      .select("-__v -updatedAt")
      .skip((page - 1) * 10)
      .limit(10);

    const totalNotifications = await MNotification.countDocuments();

    // Reset notification count for the user
    await MStudent.updateOne(
      { _id: student.id },
      { $set: { notificationCount: 0 } }
    );

    return {
      notifications: result,
      totalNotifications,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

export default { getNotifications };
