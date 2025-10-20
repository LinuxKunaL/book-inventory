import { Types } from "mongoose";
import httpCode from "http-status-codes";
import statsService from "./stats.service";
import { pushActivity } from "./activity.service";
import { MCourses } from "../../../models/courses.model";
import { AppError } from "../../../utils/Error/AppError";
import { TFilterQuery, TProgressRequest } from "../student.type";
import { MStudentStats } from "../../../models/studentStats.model";
import { MEnrolledCourses } from "../../../models/enrolledCourses.model";

const getCourses = async (query: TFilterQuery["course"]) => {
  const page = query.page || 1;
  const search = query.search || "";
  const difficulty = query.difficulty || "";
  const category = query.category || "";

  const queryFIlter = {
    $and: [
      {
        title: { $regex: search, $options: "i" },
        category: { $regex: category, $options: "i" },
        difficulty: { $regex: difficulty, $options: "i" },
        visibility: "public",
      },
    ],
  };

  try {
    const result = await MCourses.find(queryFIlter)
      .select("-__v -lessons")
      .skip((page - 1) * 10)
      .limit(10);

    const totalCourses = await MCourses.countDocuments(queryFIlter);

    return {
      courses: result,
      totalCourses,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getCourseById = async (studentId: Types.ObjectId, courseId: string) => {
  try {
    const result = await MEnrolledCourses.findOne({
      student: studentId,
      course: courseId,
    })
      .select("-__v -student")
      .populate({
        path: "course",
        select: "-__v -studentEnrolled",
      });
    const filteredResult =
      result?.course.visibility === "public" ? result : null;
    return filteredResult;
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getEnrolledCourses = async (studentId: Types.ObjectId) => {
  try {
    const result = await MEnrolledCourses.find({ student: studentId })
      .select("-__v -student")
      .populate({
        path: "course",
        match: { visibility: "public" },
        select: "-__v -lessons",
      });

    const stats = await MStudentStats.findOne({
      student: studentId,
    }).select("courses");

    return {
      courses: result,
      stats: stats.courses,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const courseEnrollment = async (courseId: string, userId: Types.ObjectId) => {
  try {
    const enrollExists = await MEnrolledCourses.findOne({
      course: courseId,
      student: userId,
    });

    if (enrollExists) {
      throw new AppError(
        "You have already enrolled in this course",
        httpCode.BAD_REQUEST
      );
    }

    await MEnrolledCourses.create({
      course: courseId,
      student: userId,
    });

    const { title } = await MCourses.findByIdAndUpdate(
      courseId,
      {
        $inc: {
          studentEnrolled: 1,
        },
      },
      {
        new: true,
      }
    ).select("title");

    pushActivity(userId, "Course", `Started '${title}' Course`, "green");

    return {
      status: "success",
    };
  } catch (error) {
    throw new AppError(error.message, httpCode.BAD_REQUEST);
  }
};

const updateProgress = async (
  userId: Types.ObjectId,
  data: TProgressRequest
) => {
  try {
    const totalLessons = Number(data.lessonsLength);
    const completedLessons = data.completedLessons.length;
    const progress = Math.floor((completedLessons / totalLessons) * 100);

    const { course } = await MEnrolledCourses.findOneAndUpdate(
      {
        student: userId,
        course: data.courseId,
      },
      {
        $addToSet: {
          completedLessons: { $each: data.completedLessons },
        },
        $set: {
          isCompleted: data.courseCompleted,
          currentLesson: data.currentLesson,
          currentVideoTime: data.currentVideoTime,
          currentLessonTitle: data.currentLessonTitle,
          progress,
        },
      },
      {
        new: true,
      }
    ).populate({
      path: "course",
      select: "title",
    });

    if (data.courseCompleted) {
      pushActivity(userId, "Course", `Finished '${course.title}' Course`, "violet");
    }

    statsService.updateCourseTotalHours(userId, data.currentVideoTime);

    statsService.updateCompletedCourses(userId);

    statsService.updateOverallProgress(userId);
    return {
      status: "success",
    };
  } catch (error) {
    throw new AppError(error.message, httpCode.BAD_REQUEST);
  }
};

export default {
  courseEnrollment,
  getEnrolledCourses,
  getCourseById,
  updateProgress,
  getCourses,
};
