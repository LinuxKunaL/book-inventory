import mongoose, { Types } from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    message: { type: String, required: true },
    private: {
      school: { type: Types.ObjectId, ref: "Schools" },
      classStandard: { type: String },
      section: { type: String },
    },
    link: { type: String },
    course: { type: String },
    quiz: { type: String },
  },
  {
    timestamps: true,
  }
);

export const MNotification = mongoose.model("Notification", NotificationSchema);
