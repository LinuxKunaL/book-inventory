import httpCode from "http-status-codes";
import { Request, Response } from "express";
import { handleErrorResponse } from "../../../utils/Error/handleError";
import { quizzesFieldsValidator } from "../validator/quiz.validator";
import { zodError } from "../../../utils/Error/zodErrorFormat";
import adminQuizService from "../services/quiz.service";

const getQuizzes = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await adminQuizService.getQuizzes(query as any);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminQuizService.getQuizById(id);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const createQuiz = async (req: Request, res: Response) => {
  const { error, data } = quizzesFieldsValidator.safeParse(req.body);

  if (error) {
    const result = zodError(error.errors);
    res.status(httpCode.BAD_REQUEST).json({ error: result });
    return;
  }

  try {
    const result = await adminQuizService.createQuiz(data!);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const updateQuiz = async (req: Request, res: Response) => {
  try {
    const { error, data } = quizzesFieldsValidator.safeParse(req.body);
    if (error) {
      const result = zodError(error.errors);
      res.status(httpCode.BAD_REQUEST).json({ error: result });
      return;
    }
    const result = await adminQuizService.updateQuiz(data!);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminQuizService.deleteQuiz(id);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getParticipants = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const result = await adminQuizService.getParticipants(id, query as any);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
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
