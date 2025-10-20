import httpCode from "http-status-codes";
import { Request, Response } from "express";
import { TFilterQuery, TProgressRequest } from "../student.type";
import studentCourseService from "../services/course.service";
import { handleErrorResponse } from "../../../utils/Error/handleError";

const getCourses = async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as TFilterQuery["course"];
    const result = await studentCourseService.getCourses(query);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getCourseById = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const studentId = req.student.id;

    const result = await studentCourseService.getCourseById(
      studentId,
      courseId
    );
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getEnrolledCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.student.id;
    const result = await studentCourseService.getEnrolledCourses(userId);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const courseEnrollment = async (req: Request, res: Response) => {
  try {
    const courseId = req.body.id;
    const userId = req.student.id;
    const result = await studentCourseService.courseEnrollment(
      courseId,
      userId
    );
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const updateProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.student.id;
    const data = req.body as TProgressRequest;
    const result = await studentCourseService.updateProgress(userId, data);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default {
  updateProgress,
  courseEnrollment,
  getEnrolledCourses,
  getCourseById,
  getCourses,
};
