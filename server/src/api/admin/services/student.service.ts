import { Types } from "mongoose";
import httpCode from "http-status-codes";
import { TFilterQuery } from "../admin.type";
import { MStudent } from "../../../models/student.model";
import { AppError } from "../../../utils/Error/AppError";
import { TStudentData } from "../validator/student.validator";
import { MStudentStats } from "../../../models/studentStats.model";
import { MRecentActivity } from "../../../models/recentActivity.model";

const createStudent = async (data: TStudentData) => {
  try {
    const result = await MStudent.create(data);
    await MStudentStats.create({ student: result._id });
    return {
      status: "success",
    };
  } catch (error) {
    console.log(error);
    
    if (error.code === 11000) {
      throw new AppError("Student already exist", httpCode.BAD_REQUEST);
    }
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getStudents = async (query: TFilterQuery["student"]) => {
  const page = query.page || 1;
  const search = query.search || "";
  const classStandard = query.class || "";
  const section = query.section || "";
  const school = query.school || "";

  const queryFIlter = {
    $and: [
      {
        studentName: { $regex: search, $options: "i" },
        classStandard: { $regex: classStandard, $options: "i" },
        section: { $regex: section, $options: "i" },
      },
      school
        ? {
            school: new Types.ObjectId(school),
          }
        : {},
    ],
  };

  try {
    const result = await MStudent.find(queryFIlter)
      .select("-password")
      .populate({
        path: "school",
        select: ["schoolName"],
      })
      .skip((page - 1) * 10)
      .limit(10);

    const totalStudent = await MStudent.countDocuments(queryFIlter);

    return {
      students: result,
      totalStudent,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const updateStudent = async (data: TStudentData) => {
  try {
    const result = await MStudent.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    return result;
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getStudentById = async (id: string) => {
  try {
    const personalInfo = await MStudent.findById(id)
      .select("-password -__v -updatedAt -lastStreakUpdate -notificationCount")
      .populate({
        path: "school",
        select: "schoolName",
      });

    const statsInfo = await MStudentStats.findOne({
      student: id,
    }).populate({
      path: "achievements.achievement",
      select: "title icon",
    });

    const recentActivities = await MRecentActivity.find({
      student: id,
    })
      .limit(5)
      .sort({
        createdAt: -1,
      })
      .select("-__v -updatedAt");

    return {
      personalInfo,
      academicInfo: {
        overallProgress: statsInfo.overallProgress,
        courseCompleted: statsInfo.courses.completed,
        quizzesProgressed: `${statsInfo.quizzes.passed}/${statsInfo.quizzes.attempted}`,
        averageScore: statsInfo.quizzes.averageScore,
      },
      achievements: statsInfo.achievements,
      recentActivities,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

export default {
  getStudentById,
  updateStudent,
  createStudent,
  getStudents,
};
