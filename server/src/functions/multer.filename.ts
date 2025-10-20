import path from "path";
import { setNestedField } from "../utils/setNestedField";
import { Request } from "express";

export const multerFilename = (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  const extension = path.extname(file.originalname);
  const fileName = file.originalname.split(".")[0].replace(/\s+/g, "");
  const random = Date.now();

  const modifiedFileName = `${fileName}-${random}${extension}`;

  if (!req.body) req.body = {};

  setNestedField(req.body, file.fieldname, modifiedFileName);

  cb(null, modifiedFileName);
};
