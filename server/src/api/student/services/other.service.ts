import multer from "multer";
import { multerDestination } from "../../../functions/multer.destination";
import { multerFilename } from "../../../functions/multer.filename";
import { IStudent } from "../../../models/student.model";
import { startOfDay, subDays, isAfter } from "date-fns";
import { Document, Types } from "mongoose";
import { MStudentStats } from "../../../models/studentStats.model";
import { MEnrolledCourses } from "../../../models/enrolledCourses.model";
import { MQuizzes } from "../../../models/quizzes.model";
import { MAchievement } from "../../../models/achievement.model";

const storage = multer({
  storage: multer.diskStorage({
    destination: multerDestination,
    filename: multerFilename,
  }),
  preservePath: true,
});

const streakCounter = async (
  student: Document<unknown, {}, IStudent, {}> &
    IStudent & {
      _id: Types.ObjectId;
    }
) => {
  try {
    const today = startOfDay(new Date());

    const yesterday = startOfDay(subDays(new Date(), 1));

    const lastUpdate = student.lastStreakUpdate
      ? startOfDay(student.lastStreakUpdate)
      : null;

    if (!lastUpdate) {
      // First streak entry
      student.streak = 1;
      student.lastStreakUpdate = new Date();
    } else if (isAfter(today, lastUpdate)) {
      // New day → check if yesterday was last update
      if (lastUpdate.getTime() === yesterday.getTime()) {
        // ✅ Continued streak
        student.streak += 1;
      } else {
        // ❌ Missed a day → reset streak
        student.streak = 1;
      }
      student.lastStreakUpdate = new Date();
    }
    // If lastUpdate == today → do nothing (already counted)

    await student.save();
    return student.streak;
  } catch (error) {
    console.error(error);
  }
};

const getOverviewData = async (userId: Types.ObjectId) => {
  const [gridOverview] = await MStudentStats.aggregate([
    {
      $match: {
        student: userId,
      },
    },
    {
      $project: {
        overallProgress: 1,
        "courses.completed": 1,
        "courses.totalHours": 1,
        achievements: { $size: "$achievements" },
      },
    },
  ]);
  const progressCourses = await MEnrolledCourses.find({
    student: userId,
    isCompleted: false,
  })
    .populate({
      path: "course",
      select: "title",
    })
    .select("progress currentLessonTitle")
    .limit(2);

  const { achievements } = await MStudentStats.findOne({
    student: userId,
  })
    .select("achievements")
    .populate({
      path: "achievements.achievement",
      options: { limit: 3 },
    });
  const quizResults = await MQuizzes.find({
    visibility: "public",
  })
    .select("title difficulty timeLimit description")
    .limit(3);

  return {
    gridOverview,
    progressCourses,
    achievements,
    quizResults,
  };
};

const getAchievements = async (userId: Types.ObjectId) => {
  const { achievements } = await MStudentStats.findOne({
    student: userId,
  })
    .select("achievements")
    .populate({
      path: "achievements.achievement",
    });

  const lockAchievements = await MAchievement.find();

  const filterLock = lockAchievements.filter(
    (ach) => !achievements.some((ach2) => ach2.achievement._id.equals(ach._id))
  );

  return { unlock: achievements, look: filterLock };
};


export default {
  getAchievements,
  getOverviewData,
  streakCounter,
  storage,
};
