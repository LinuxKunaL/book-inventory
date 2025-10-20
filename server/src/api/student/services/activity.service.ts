import { Types } from "mongoose";
import { MRecentActivity } from "../../../models/recentActivity.model";

export const pushActivity = async (
  userId: Types.ObjectId,
  name: string,
  description: string,
  color: string
) => {
  try {
    await MRecentActivity.create({
      name,
      color,
      description,
      student: userId,
    });
    console.log("activity pushed", name);
  } catch (error) {
    console.log(error);
  }
};

export const getUserActivity = async (userId: Types.ObjectId) => {
  return await MRecentActivity.find({ student: userId });
};
