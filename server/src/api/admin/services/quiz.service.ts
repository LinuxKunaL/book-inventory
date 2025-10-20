import httpCode from "http-status-codes";
import { AppError } from "../../../utils/Error/AppError";
import { MQuizzes } from "../../../models/quizzes.model";
import { TQuizzes } from "../validator/quiz.validator";
import { TFilterQuery } from "../admin.type";
import { MAttemptQuiz } from "../../../models/attemptQuiz.model";
import { Types } from "mongoose";

const createQuiz = async (data: TQuizzes) => {
  try {
    await MQuizzes.create(data);
    return {
      status: "success",
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getQuizzes = async (query: TFilterQuery["quiz"]) => {
  const page = query.page || 1;
  const search = query.search || "";
  const assignedGroups = query.class || "";
  const difficulty = query.difficulty || "";

  const queryFIlter = {
    $and: [
      {
        title: { $regex: search, $options: "i" },
        assignedGroups: { $regex: assignedGroups, $options: "i" },
        difficulty: { $regex: difficulty, $options: "i" },
      },
    ],
  };

  try {
    const result = await MQuizzes.find(queryFIlter)
      .select("-__v -questions")
      .skip((page - 1) * 10)
      .limit(10);

    const totalQuizzes = await MQuizzes.countDocuments(queryFIlter);

    const [
      totalCreatedQuizzes,
      totalPublicQuizzes,
      attemptedStudents,
      averageScore,
    ] = await Promise.all([
      MQuizzes.countDocuments(),
      MQuizzes.countDocuments({ visibility: "public" }),
      MQuizzes.aggregate([
        {
          $project: {
            attemptedCount: { $size: "$attemptedStudents" },
          },
        },
        {
          $group: {
            _id: null,
            attemptedStudentsCount: { $sum: "$attemptedCount" },
          },
        },
      ]),
      MAttemptQuiz.aggregate([
        {
          $group: {
            _id: null,
            averageScore: { $avg: "$score" },
          },
        },
      ]),
    ]);

    const stats = {
      totalQuizzes: totalCreatedQuizzes,
      totalPublicQuizzes: totalPublicQuizzes,
      averageScore: averageScore[0]?.averageScore || 0,
      studentsAttempted: attemptedStudents[0]?.attemptedStudentsCount || 0,
    };

    return {
      quizzes: result,
      totalQuizzes,
      stats,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getQuizById = (id: string) => {
  try {
    const result = MQuizzes.findById(id).select("-__v");
    return result;
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const updateQuiz = async (data: TQuizzes) => {
  try {
    await MQuizzes.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    return {
      status: "success",
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const deleteQuiz = async (id: string) => {
  try {
    const result = await MQuizzes.findByIdAndDelete(id);
    if (!result) {
      throw new AppError("Quiz not found", httpCode.NOT_FOUND);
    }
    return {
      status: "success",
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getParticipants = async (
  id: string,
  query: TFilterQuery["participant"]
) => {
  try {
    const page = query.page || 1;
    const status = query.status || "";
    const classStandard = query.classStandard || "";

    const queryFIlter = {
      $and: [
        {
          status: { $regex: status, $options: "i" },
        },
      ],
    };

    const result = await MAttemptQuiz.find({ quiz: id, ...queryFIlter })
      .select("student result score timeSpent status completedAt")
      .populate({
        path: "student",
        select: "studentName email classStandard section school",
        match: { classStandard: { $regex: classStandard, $options: "i" } },
        populate: {
          path: "school",
          select: "schoolName",
        },
      })
      .skip((page - 1) * 10)
      .limit(10);

    const filterResult = result.filter((quiz) => quiz.student != null);

    const [totalParticipants, quizData] = await Promise.all([
      MAttemptQuiz.countDocuments({ quiz: id }),
      MQuizzes.findById(id).select("title passingScore timeLimit"),
    ]);

    const [[totalScore], [totalPassed]] = await Promise.all([
      MAttemptQuiz.aggregate([
        {
          $match: { quiz: new Types.ObjectId(id) },
        },
        {
          $group: {
            _id: null,
            totalScore: { $sum: "$score" },
          },
        },
      ]),
      MAttemptQuiz.aggregate([
        {
          $match: { quiz: new Types.ObjectId(id), status: "passed" },
        },
        {
          $group: {
            _id: null,
            totalPassed: { $sum: 1 },
          },
        },
      ]),
    ]);

    const stats = {
      averageScore: Number(
        totalScore?.totalScore || 0 / totalParticipants || 0
      ).toFixed(2),
      passingRate: Number(
        (totalPassed?.totalScore || 0 / totalParticipants || 0) * 100
      ).toFixed(2),
    };

    return {
      stats,
      quizData,
      participants: filterResult,
      totalParticipants,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

export default {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getParticipants,
};
