import httpCode from "http-status-codes";
import { Request, Response } from "express";
import service from "../services/other.service";
import { handleErrorResponse } from "../../../utils/Error/handleError";

const getOverviewData = async (req: Request, res: Response) => {
  try {
    const userId = req.student.id;
    const result = await service.getOverviewData(userId);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getAchievements = async (req: Request, res: Response) => {
  try {
    const userId = req.student.id;
    const result = await service.getAchievements(userId);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default { getOverviewData, getAchievements };
