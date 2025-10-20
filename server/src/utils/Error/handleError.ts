import { Response } from "express";
import httpCode from "http-status-codes";
import { AppError } from "./AppError";

export const handleErrorResponse = (error: unknown, res: Response) => {
  const ErrorModified = error as AppError;
  console.log(ErrorModified.name, ErrorModified.message);
  res
    .status(ErrorModified.status || httpCode.INTERNAL_SERVER_ERROR)
    .json({ error: ErrorModified.message });
};
