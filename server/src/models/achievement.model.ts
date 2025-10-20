import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  condition: { type: String, required: true },
});

export const MAchievement = mongoose.model("Achievement", achievementSchema);
