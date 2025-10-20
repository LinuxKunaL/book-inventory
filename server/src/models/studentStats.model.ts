import { InferSchemaType, model, Schema } from "mongoose";

const StudentStatsSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "Student" },
  achievements: [
    {
      _id: false,
      achievement: {
        type: Schema.Types.ObjectId,
        ref: "Achievement",
      },
      unlockDate: { type: Date },
    },
  ],
  overallProgress: { type: Number, default: 0 },
  quizzes: {
    attempted: { type: Number, default: 0 },
    passed: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
  },
  courses: {
    inProgress: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    totalHours: { type: Number, default: 0 },
  },
});
export const MStudentStats = model("studentStats", StudentStatsSchema);
