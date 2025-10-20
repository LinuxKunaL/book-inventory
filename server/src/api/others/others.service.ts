import httpCode from "http-status-codes";
import { MStudent } from "../../models/student.model";
import { AppError } from "../../utils/Error/AppError";
import { Types } from "mongoose";
import { MSchool } from "../../models/school.model";
import { TSchoolData } from "./others.validator";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";

const registerSchool = async (data: TSchoolData) => {
  try {
    const result = await MSchool.create(data);
    return {
      status: "success",
    };
  } catch (error) {
    if (error.code === 11000) {
      const key = Object.keys(error.keyValue)[0];
      const modifiedKay = key.replace(/([a-z])([A-Z])/g, "$1 $2");
      throw new AppError(
        `School already exist : ${modifiedKay}`,
        httpCode.BAD_REQUEST
      );
    }
    throw new AppError(
      error.message + " - Error in Mongodb",
      httpCode.BAD_REQUEST
    );
  }
};

const getThumbnail = async (filename: string) => {
  try {
    return path.join(__dirname, "../../uploads/thumbnails/", filename);
  } catch (error) {
    return "";
  }
};

const getResource = async (filename: string) => {
  try {
    return path.join(__dirname, "../../uploads/resources/", filename);
  } catch (error) {
    return "";
  }
};

const getVideo = async (req: Request, res: Response) => {
  const { filename } = req.query;

  const videoPath = path.join(
    __dirname,
    "../../uploads/videos",
    filename as string
  );

  if (!fs.existsSync(videoPath)) {
    throw new AppError("Video not found", httpCode.NOT_FOUND);
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
    return;
  }

  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = end - start + 1;

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize,
    "Content-Type": "video/mp4",
  });

  fs.createReadStream(videoPath, { start, end }).pipe(res);
};

export default { registerSchool, getThumbnail, getResource, getVideo };
