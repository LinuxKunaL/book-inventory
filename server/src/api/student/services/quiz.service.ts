import { Request } from "express";
import httpCode from "http-status-codes";
import statsController from "./stats.service";
import { pushActivity } from "./activity.service";
import { AppError } from "../../../utils/Error/AppError";
import { MQuizzes } from "../../../models/quizzes.model";
import { TFilterQuery, TQuizResultRequest } from "../student.type";
import { MAttemptQuiz } from "../../../models/attemptQuiz.model";
import { MStudentStats } from "../../../models/studentStats.model";

const getQuizzes = async (
  query: TFilterQuery["quiz"],
  user: Request["student"]
) => {
  const page = query.page || 1;
  const search = query.search || "";
  const difficulty = query.difficulty || "";

  const queryFIlter = {
    $and: [
      {
        assignedGroups: { $in: user.classStandard },
        title: { $regex: search.trim(), $options: "i" },
        difficulty: { $regex: difficulty.trim(), $options: "i" },
      },
    ],
  };

  try {
    const result = await MQuizzes.find(queryFIlter)
      .select("-__v -questions")
      .skip((page - 1) * 10)
      .limit(10);

    const totalQuizzes = await MQuizzes.countDocuments(queryFIlter);

    return {
      quizzes: result,
      totalQuizzes,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getAttemptQuizzes = async (
  query: TFilterQuery["quiz"],
  user: Request["student"]
) => {
  try {
    const page = query.page || 1;
    const search = query.search || "";
    const status = query.status || "";
    const difficulty = query.difficulty || "";

    const queryFIlter = {
      $and: [
        {
          status: { $regex: status.trim(), $options: "i" },
          difficulty: { $regex: difficulty.trim(), $options: "i" },
          title: { $regex: search.trim(), $options: "i" },
        },
      ],
    };

    const result = await MAttemptQuiz.find({
      student: user.id,
      ...queryFIlter,
    })
      .select("-__v -result -questionsReview -student")
      .populate({
        path: "quiz",
        select: "-__v -questions -assignedGroups -attemptedStudents",
      })
      .skip((page - 1) * 10)
      .limit(10);

    const totalQuizzes = await MAttemptQuiz.countDocuments({
      student: user.id,
      ...queryFIlter,
    });

    const stats = await MStudentStats.findOne({
      student: user.id,
    }).select("quizzes");

    return {
      quizzes: result,
      totalQuizzes,
      stats: stats.quizzes,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const attemptQuiz = async (id: string, user: Request["student"]) => {
  try {
    const alreadyAttempted = await MAttemptQuiz.findOne({
      student: user.id,
      quiz: id,
    });

    if (alreadyAttempted) {
      throw new AppError(
        "You have already attempted this quiz",
        httpCode.BAD_REQUEST
      );
    }

    const result = await MQuizzes.findOne({
      _id: id,
      assignedGroups: { $in: [user.classStandard] },
      visibility: "public",
    }).select(
      "-__v -questions.correctAnswer -assignedGroups -visibility -difficulty"
    );
    return result;
  } catch (error) {
    throw new AppError(error.message, httpCode.BAD_REQUEST);
  }
};

const submitQuiz = async (data: TQuizResultRequest, user: Request["student"]) => {
  try {
    const AttemptExists = await MAttemptQuiz.findOne({
      student: user.id,
      quizId: data.quizId,
    });

    if (AttemptExists) {
      throw new AppError(
        "You have already attempted this quiz",
        httpCode.BAD_REQUEST
      );
    }

    const quiz = await MQuizzes.findById(data.quizId);

    if (!quiz) {
      throw new AppError("Quiz not found", httpCode.NOT_FOUND);
    }

    let result = {
      correct: 0,
      wrong: 0,
      notAttempted: 0,
      totalQuestions: quiz.questionsLength,
    };
    let questionsReview = [];

    for (const question of quiz.questions) {
      const answer = data.answers[question.id];
      const correct = question.correctAnswer;

      if (answer === undefined) {
        result.notAttempted++;
      } else if (answer === correct) {
        result.correct++;
      } else {
        result.wrong++;
      }

      questionsReview.push({
        ...question,
        studentAnswer: answer,
      });
    }

    const score = (result.correct / result.totalQuestions) * 100;
    const status = score >= quiz.passingScore ? "passed" : "failed";

    await MAttemptQuiz.create({
      title: quiz.title,
      difficulty: quiz.difficulty,
      quiz: data.quizId,
      completedAt: data.completedAt,
      timeSpent: data.timeSpent,
      student: user.id,
      result,
      status,
      questionsReview,
      score,
    });

    const { title } = await MQuizzes.findOneAndUpdate(
      { _id: data.quizId },
      {
        $push: {
          attemptedStudents: user.id,
        },
      },
      {
        new: true,
      }
    ).select("title");

    pushActivity(user.id, "quiz", `Completed '${title}' quiz`, "emerald");

    statsController.updateCompletedQuizzes(user.id);

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

const getQuizResult = async (id: string) => {
  try {
    const result = await MAttemptQuiz.findById(id).select("-__v").populate({
      path: "quiz",
      select: "title passingScore questionsLength timeLimit",
    });
    return result;
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

export default {
  getAttemptQuizzes,
  attemptQuiz,
  submitQuiz,
  getQuizResult,
  getQuizzes,
};
