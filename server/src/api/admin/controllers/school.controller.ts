import httpCode from "http-status-codes";
import { TFilterQuery } from "../admin.type";
import { Request, Response } from "express";
import adminSchoolService from "../services/school.service";
import { handleErrorResponse } from "../../../utils/Error/handleError";

const getSchools = async (req: Request, res: Response) => {
  try {
    const query = req.query as TFilterQuery["school"];
    const result = await adminSchoolService.getSchools(query);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default { getSchools };
