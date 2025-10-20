import { model, Schema } from "mongoose";
import { TCourseData } from "../api/admin/validator/course.validator";

export type TEnrolledCourses = {
  student: Schema.Types.ObjectId;
  course: TCourseData;
  isCompleted: boolean;
  progress: number;
  currentLesson: string;
  completedLessons: string[];
  currentLessonTitle: string;
};

const EnrolledCoursesSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Students" },
    course: { type: Schema.Types.ObjectId, ref: "Courses" },
    isCompleted: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    currentLesson: { type: String, default: "" },
    currentLessonTitle: { type: String, default: "" },
    completedLessons: { type: [String], default: [] },
    currentVideoTime: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const MEnrolledCourses = model<TEnrolledCourses>(
  "enrolledCourses",
  EnrolledCoursesSchema
);
