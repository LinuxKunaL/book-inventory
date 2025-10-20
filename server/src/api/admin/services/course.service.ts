import httpCode from "http-status-codes";
import { TFilterQuery } from "../admin.type";
import { MCourses } from "../../../models/courses.model";
import { AppError } from "../../../utils/Error/AppError";
import { TCourseData } from "../validator/course.validator";
import { deleteAllFiles } from "../../../middleware/deleteFiles.middleware";

const createCourse = (course: TCourseData) => {
  try {
    const result = MCourses.create(course);
    return result;
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

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
      },
    ],
  };

  try {
    const result = await MCourses.find(queryFIlter)
      .select("-__v -lessons")
      .skip((page - 1) * 10)
      .limit(10);

    const totalCourses = await MCourses.countDocuments(queryFIlter);

    const [totalCreatedCourses, totalPublicCourses, totalEnrolled] =
      await Promise.all([
        MCourses.countDocuments(),
        MCourses.countDocuments({ visibility: "public" }),
        MCourses.aggregate([
          {
            $group: {
              _id: null,
              studentEnrolled: { $sum: "$studentEnrolled" },
            },
          },
        ]),
      ]);

    const stats = {
      totalCreatedCourses,
      totalPublicCourses,
      totalEnrolled: totalEnrolled[0]?.studentEnrolled || 0,
    };

    return {
      courses: result,
      totalCourses,
      stats,
    };
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getCourseById = (id: string) => {
  try {
    const result = MCourses.findById(id).select("-__v -studentEnrolled");
    return result;
  } catch (error) {
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const updateCourse = async (course: TCourseData) => {
  try {
    await MCourses.updateOne(
      { _id: course._id },
      {
        $pull: {
          "lessons.$[].resources": {
            name: { $in: course.deletedFiles?.resources },
          },
        },
      }
    );
    await MCourses.updateOne(
      { _id: course._id },
      {
        $set: {
          title: course.title,
          description: course.description,
          category: course.category,
          difficulty: course.difficulty,
          duration: course.duration,
          visibility: course.visibility,
          thumbnail: course.thumbnail,
          lessons: course.lessons,
        },
      }
    );
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

const deleteCourse = async (id: string) => {
  try {
    const course = await MCourses.findById(id);
    if (course) {
      deleteAllFiles(course);
    }
    MCourses.findByIdAndDelete(id);
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

export default {
  getCourseById,
  deleteCourse,
  updateCourse,
  createCourse,
  getCourses,
};
