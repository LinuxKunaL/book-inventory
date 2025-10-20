import httpCode from "http-status-codes";
import { Request, Response } from "express";
import { TFilterQuery } from "../admin.type";
import adminCourseService from "../services/course.service";
import { zodError } from "../../../utils/Error/zodErrorFormat";
import { handleErrorResponse } from "../../../utils/Error/handleError";
import { coursesFieldsValidator } from "../validator/course.validator";

const getCourses = async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as TFilterQuery["course"];
    const result = await adminCourseService.getCourses(query);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminCourseService.getCourseById(id);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const createCourse = async (req: Request, res: Response) => {
  const { error, data } = coursesFieldsValidator.safeParse(req.body);

  if (error) {
    const result = zodError(error.errors);
    res.status(httpCode.BAD_REQUEST).json({ error: result });
    return;
  }

  try {
    const result = await adminCourseService.createCourse(data!);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const updateCourse = async (req: Request, res: Response) => {
  try {
    const { error, data } = coursesFieldsValidator.safeParse(req.body);
    if (error) {
      const result = zodError(error.errors);
      res.status(httpCode.BAD_REQUEST).json({ error: result });
      return;
    }
    const result = await adminCourseService.updateCourse(data!);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminCourseService.deleteCourse(id);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default {
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourses,
  createCourse,
};
