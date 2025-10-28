"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerFilename = void 0;
const path_1 = __importDefault(require("path"));
const setNestedField_1 = require("../utils/setNestedField");
const multerFilename = (req, file, cb) => {
    const extension = path_1.default.extname(file.originalname);
    const fileName = file.originalname.split(".")[0].replace(/\s+/g, "");
    const random = Date.now();
    const modifiedFileName = `${fileName}-${random}${extension}`;
    if (!req.body)
        req.body = {};
    (0, setNestedField_1.setNestedField)(req.body, file.fieldname, modifiedFileName);
    cb(null, modifiedFileName);
};
exports.multerFilename = multerFilename;
