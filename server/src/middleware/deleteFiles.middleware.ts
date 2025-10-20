import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { TCourseData } from "../api/admin/validator/course.validator";


type TFileDeleted = {
  thumbnail: string;
  resources: string[];
  video: string[];
};

/**
 * @function deleteFiles -
 * @description This middleware is used to delete old files of uploaded course
 * */
export const deleteFiles = (req: Request, res: any, next: NextFunction) => {
  const files: TFileDeleted = req.body.deletedFiles;
  const baseDir = path.resolve("./src/uploads");

  if (files === undefined) {
    next();
    return;
  }

  if (files?.resources?.length !== 0) {
    files.resources?.map((resource) => {
      if (resource != "") {
        fs.unlinkSync(`${baseDir}/resources/${resource}`);
      }
    });
  }
  if (files?.thumbnail) {
    if (files?.thumbnail != "") {
      fs.unlinkSync(`${baseDir}/thumbnails/${files?.thumbnail}`);
    }
  }

  if (files.video?.length !== 0) {
    files.video?.map((video) => {
      if (video != "") {
        fs.unlinkSync(`${baseDir}/videos/${video}`);
      }
    });
  }

  next();
};

export const deleteAllFiles = (course: TCourseData) => {
  const thumbnailPath = course.thumbnail;
  const videosPath = course.lessons.map((lesson) => lesson.video);
  const resourcesPath = course.lessons.map((lesson) => lesson.resources).flat();
  const baseDir = path.resolve("./src/uploads");

  if (thumbnailPath != "") {
    fs.unlinkSync(`${baseDir}/thumbnails/${thumbnailPath}`);
  }
  if (videosPath.length !== 0) {
    videosPath.map((video) => {
      if (video.name != "") {
        fs.unlinkSync(`${baseDir}/videos/${video.name}`);
      }
    });
  }
  if (resourcesPath.length !== 0) {
    resourcesPath.map((resource) => {
      if (resource.name != "") {
        fs.unlinkSync(`${baseDir}/resources/${resource.name}`);
      }
    });
  }
};
