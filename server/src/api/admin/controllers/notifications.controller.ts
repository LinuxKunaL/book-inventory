import httpCode from "http-status-codes";
import { Request, Response } from "express";

import service from "../services/notifications.service";
import { TFilterQuery } from "../admin.type";
import { handleErrorResponse } from "../../../utils/Error/handleError";

const getNotifications = async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as TFilterQuery["notification"];
    const result = await service.getNotifications(query);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default { getNotifications };
