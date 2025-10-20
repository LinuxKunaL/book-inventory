import { NextFunction, Request, Response } from "express";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  res.status(400).json({ error: err.message || "Something went wrong" });
};
