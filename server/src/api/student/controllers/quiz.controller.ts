import httpCode from "http-status-codes";
import { Request, Response } from "express";
import { handleErrorResponse } from "../../../utils/Error/handleError";
import studentQuizService from "../services/quiz.service";

const getQuizzes = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const user = req.student;
    const result = await studentQuizService.getQuizzes(query as any, user);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getAttemptQuizzes = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const user = req.student;
    const result = await studentQuizService.getAttemptQuizzes(
      query as any,
      user
    );
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const attemptQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.student;
    const result = await studentQuizService.attemptQuiz(id, user);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const submitQuiz = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = req.student;
    const result = await studentQuizService.submitQuiz(data, user);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getQuizResult = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await studentQuizService.getQuizResult(id);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default {
  getAttemptQuizzes,
  submitQuiz,
  getQuizzes,
  attemptQuiz,
  getQuizResult,
};
