import httpCode from "http-status-codes";
import { Request, Response } from "express";
import { TFilterQuery } from "../student.type";
import notificationService from "../services/notification.service";
import { handleErrorResponse } from "../../../utils/Error/handleError";

const getNotifications = async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as TFilterQuery["course"];
    const student = req.student;

    const result = await notificationService.getNotifications(query, student);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default { getNotifications };
