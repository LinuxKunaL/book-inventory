import httpCode from "http-status-codes";
import { Request, Response } from "express";
import othersService from "./others.service";
import { schoolFieldsValidator } from "./others.validator";
import { zodError } from "../../utils/Error/zodErrorFormat";
import { handleErrorResponse } from "../../utils/Error/handleError";
import { EFileType } from "../../types/enum";

const registerSchool = async (req: Request, res: Response) => {
  const { error, data } = schoolFieldsValidator.safeParse(req.body);

  if (error) {
    const result = zodError(error.errors);
    res.status(httpCode.BAD_REQUEST).json({ error: result });
    return;
  }

  try {
    const result = await othersService.registerSchool(data!);
    res.status(httpCode.OK).json(result);
    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

const getUploads = async (req: Request, res: Response) => {
  try {
    const { type, filename } = req.query;

    var file;

    if (type == EFileType.THUMBNAIL) {
      file = await othersService.getThumbnail(filename as string);
    }

    if (type == EFileType.RESOURCE) {
      file = await othersService.getResource(filename as string);
    }

    if (type == EFileType.VIDEO) {
      return await othersService.getVideo(req, res);
    }

    res.status(httpCode.OK).sendFile(file);

    return;
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export default { registerSchool, getUploads };
