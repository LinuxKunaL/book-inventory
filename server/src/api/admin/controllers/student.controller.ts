import httpCode from "http-status-codes";
import { Request, Response } from "express";
import { zodError } from "../../../utils/Error/zodErrorFormat";
import services from "../services/student.service";
import { handleErrorResponse } from "../../../utils/Error/handleError";
import { studentFieldsValidator } from "../validator/student.validator";

const createStudent = async (req: Request, res: Response) => {
  const { error, data } = studentFieldsValidator.safeParse(req.body);

  if (error) {
    const result = zodError(error.errors);
    res.status(httpCode.BAD_REQUEST).json({ error: result });
    return;
  }

  try {
    const result = await services.createStudent(data!);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await services.getStudents(query as any);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const updateStudent = async (req: Request, res: Response) => {
  const { error, data } = studentFieldsValidator.safeParse(req.body);

  if (error) {
    const result = zodError(error.errors);
    res.status(httpCode.BAD_REQUEST).json({ error: result });
    return;
  }

  try {
    const result = await services.updateStudent(data);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await services.getStudentById(id);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default {
  updateStudent,
  createStudent,
  getStudentById,
  getStudents,
};
