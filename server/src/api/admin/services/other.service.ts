import multer from "multer";
import { multerDestination } from "../../../functions/multer.destination";
import { multerFilename } from "../../../functions/multer.filename";
import { MStudent } from "../../../models/student.model";
import { MCourses } from "../../../models/courses.model";
import { MSchool } from "../../../models/school.model";
import { MQuizzes } from "../../../models/quizzes.model";
import { MStudentStats } from "../../../models/studentStats.model";
import { MAttemptQuiz } from "../../../models/attemptQuiz.model";

const storage = multer({
  storage: multer.diskStorage({
    destination: multerDestination,
    filename: multerFilename,
  }),
  preservePath: true,
});

const getOverviewData = async () => {
  const [totalStudents, activeCourses, totalSchool, totalQuizzes] =
    await Promise.all([
      MStudent.countDocuments(),
      MCourses.countDocuments(),
      MSchool.countDocuments(),
      MQuizzes.countDocuments(),
    ]);

  const studentsResult = await MStudentStats.find({
    overallProgress: { $gte: 70 },
  })
    .populate({
      path: "student",
      select: "studentName",
      populate: {
        path: "school",
        select: "schoolName",
      },
    })
    .select("student overallProgress courses.completed quizzes.attempted");

  const recentQuizzes = await MQuizzes.aggregate([
    {
      $sort: {
        updatedAt: -1,
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        title: 1,
        difficulty: 1,
        description: 1,
        participantsCount: { $size: "$attemptedStudents" },
      },
    },
  ]);

  const topPerformingStudents = studentsResult.map((student) => {
    return {
      quizzesCompleted: student?.quizzes?.attempted ?? 0,
      coursesCompleted: student?.courses?.completed ?? 0,
      overallProgress: student?.overallProgress ?? 0,
      student: student?.student,
    };
  });

  const totalOverview = {
    totalStudents,
    activeCourses,
    totalSchool,
    totalQuizzes,
  };

  return {
    totalOverview,
    topPerformingStudents,
    recentQuizzes,
  };
};

export default {
  getOverviewData,
  storage,
};
