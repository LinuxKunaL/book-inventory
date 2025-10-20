import { Types } from "mongoose";
import { MStudentStats } from "../../../models/studentStats.model";
import { MEnrolledCourses } from "../../../models/enrolledCourses.model";
import { MAttemptQuiz } from "../../../models/attemptQuiz.model";
import achievementsService from "./achievements.service";

const updateCourseTotalHours = async (
  userId: Types.ObjectId,
  watchSeconds: number
) => {
  try {
    await MStudentStats.findOneAndUpdate(
      { student: userId },
      { $inc: { "courses.totalHours": watchSeconds } }
    );
    achievementsService.unlockCourseHoursAchievements(userId, watchSeconds);
  } catch (error) {
    console.log("❌ updateCourseTotalHours error: ", error);
  }
};

const updateCompletedCourses = async (userId: Types.ObjectId) => {
  try {
    const [completed, inProgress] = await Promise.all([
      MEnrolledCourses.countDocuments({
        student: userId,
        isCompleted: true,
      }),
      MEnrolledCourses.countDocuments({
        student: userId,
        isCompleted: false,
      }),
    ]);

    // check for achievements
    if (completed) {
      achievementsService.unlockCourseAchievements(userId, completed);
    }
    
    await MStudentStats.findOneAndUpdate(
      { student: userId },
      {
        $set: {
          "courses.completed": completed,
          "courses.inProgress": inProgress,
        },
      }
    );
  } catch (error) {
    console.log("❌ updateCompletedCourses error: ", error);
  }
};

const updateCompletedQuizzes = async (userId: Types.ObjectId) => {
  try {
    const [stats] = await MAttemptQuiz.aggregate([
      {
        $match: { student: userId },
      },
      {
        $facet: {
          passed: [{ $match: { status: "passed" } }, { $count: "count" }],
          attempted: [{ $count: "count" }],
          averageScore: [
            { $match: { status: "passed" } },
            { $group: { _id: null, avg: { $avg: "$score" } } },
          ],
        },
      },
      {
        $project: {
          passed: { $ifNull: [{ $arrayElemAt: ["$passed.count", 0] }, 0] },
          attempted: {
            $ifNull: [{ $arrayElemAt: ["$attempted.count", 0] }, 0],
          },
          averageScore: {
            $ifNull: [{ $arrayElemAt: ["$averageScore.avg", 0] }, 0],
          },
        },
      },
    ]);

    const { passed, attempted, averageScore } = stats || {
      passed: 0,
      attempted: 0,
      averageScore: 0,
    };

    if (attempted) {
      achievementsService.unlockQuizAchievements(userId, attempted);
    }

    await MStudentStats.findOneAndUpdate(
      { student: userId },
      {
        $set: {
          "quizzes.passed": passed,
          "quizzes.attempted": attempted,
          "quizzes.averageScore": Number(averageScore).toFixed(2),
        },
      }
    );
  } catch (error) {
    console.log("❌ updateCompletedQuizzes error:", error);
  }
};

const updateOverallProgress = async (userId: Types.ObjectId) => {
  try {
    const [courseStats] = await MEnrolledCourses.aggregate([
      {
        $match: {
          student: userId,
        },
      },
      {
        $group: {
          _id: null,
          averageProgress: { $avg: "$progress" },
        },
      },
    ]);
    const [scoreStats] = await MAttemptQuiz.aggregate([
      {
        $match: {
          student: userId,
          status: "passed",
        },
      },
      {
        $group: {
          _id: null,
          averageScore: { $avg: "$score" },
        },
      },
    ]);

    const { averageProgress } = courseStats || { averageProgress: 0 };
    const { averageScore } = scoreStats || { averageScore: 0 };

    const overallProgress = Number(
      (averageProgress + averageScore) / 2
    ).toFixed(2);

    await MStudentStats.findOneAndUpdate(
      { student: userId },
      {
        $set: {
          overallProgress,
        },
      }
    );
  } catch (error) {
    console.log("❌ updateOverallProgress error:", error);
  }
};

export default {
  updateOverallProgress,
  updateCourseTotalHours,
  updateCompletedCourses,
  updateCompletedQuizzes,
};
