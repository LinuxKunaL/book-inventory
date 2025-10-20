import mongoose from "mongoose";

const recentActivitySchema = new mongoose.Schema(
  {
    student: { type: mongoose.Types.ObjectId, ref: "Student", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true},
    color: { type: String },
  },
  {
    timestamps: true,
  }
);

export const MRecentActivity = mongoose.model(
  "RecentActivity",
  recentActivitySchema
);
