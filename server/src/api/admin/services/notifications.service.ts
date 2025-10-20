import { MNotification } from "../../../models/notifications.model";
import { AppError } from "../../../utils/Error/AppError";
import httpCode from "http-status-codes";
import { TFilterQuery } from "../admin.type";

const getNotifications = async (query: TFilterQuery["notification"]) => {
  const page = query.page || 1;
  const type = query.type || "";

  const queryFIlter = {
    $and: [
      {
        type: { $regex: type, $options: "i" },
      },
    ],
  };

  try {
    const result = await MNotification.find(queryFIlter)
      .skip((page - 1) * 10)
      .limit(10)
      .populate({
        path: "private.school",
        select: "schoolName",
      });

    const totalNotifications = await MNotification.countDocuments(queryFIlter);

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
