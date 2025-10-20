import httpCode from "http-status-codes";
import authService from "./auth.service";
import { Request, Response } from "express";
import {
  adminLoginValidator,
  requestOtpValidator,
  studentRegValidator,
} from "./auth.validator";
import { zodError } from "../../utils/Error/zodErrorFormat";
import { handleErrorResponse } from "../../utils/Error/handleError";

const adminLogin = async (req: Request, res: Response) => {
  const { error, data } = adminLoginValidator.safeParse(req.body);

  if (error) {
    const result = zodError(error.errors);
    res.status(httpCode.BAD_REQUEST).json({ error: result });
    return;
  }

  try {
    const result = await authService.adminLogin(data!);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const adminMe = async (req: Request, res: Response) => {
  try {
    const result = await authService.adminMe(req.admin.id);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const studentRegister = async (req: Request, res: Response) => {
  const { error, data } = studentRegValidator.safeParse(req.body);

  if (error) {
    const result = zodError(error.errors);
    res.status(httpCode.BAD_REQUEST).json({ error: result });
    return;
  }

  try {
    const result = await authService.studentRegister(data!);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const studentLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.studentLogin(req.body);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const requestOtp = async (req: Request, res: Response) => {
  const { data, error } = requestOtpValidator.safeParse(req.body);

  if (error) {
    const result = zodError(error.errors);
    res.status(httpCode.BAD_REQUEST).json({ error: result });
    return;
  }

  try {
    const result = await authService.requestOtp(data);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const studentMe = async (req: Request, res: Response) => {
  try {
    const result = await authService.studentMe(req.student.id);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const userId = req.student.id;
    const result = await authService.updateStudent(userId, req.body);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.student.id;
    const result = await authService.updateStudentPassword(userId, req.body);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default {
  adminMe,
  studentMe,
  adminLogin,
  requestOtp,
  updatePassword,
  updateStudent,
  studentLogin,
  studentRegister,
};
