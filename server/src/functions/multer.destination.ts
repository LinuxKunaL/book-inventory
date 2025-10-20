import { Request } from "express";
import fs from "fs";
import path from "path";

export const multerDestination = (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  const baseDir = path.resolve("./src/uploads");
  const paths = {
    thumbnail: path.join(baseDir, "thumbnails"),
    resources: path.join(baseDir, "resources"),
    video: path.join(baseDir, "videos"),
  };

  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);

  Object.values(paths).forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  });

  for (const [key, folder] of Object.entries(paths)) {
    if (file.fieldname.includes(key)) {
      return cb(null, folder);
    }
  }

  cb(new Error("Invalid file fieldname"), null);
};
