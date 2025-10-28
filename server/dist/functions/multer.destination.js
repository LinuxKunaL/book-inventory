"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerDestination = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multerDestination = (req, file, cb) => {
    const baseDir = path_1.default.resolve("./src/uploads");
    const paths = {
        thumbnail: path_1.default.join(baseDir, "thumbnails"),
        resources: path_1.default.join(baseDir, "resources"),
        video: path_1.default.join(baseDir, "videos"),
    };
    if (!fs_1.default.existsSync(baseDir))
        fs_1.default.mkdirSync(baseDir);
    Object.values(paths).forEach((dir) => {
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir);
    });
    for (const [key, folder] of Object.entries(paths)) {
        if (file.fieldname.includes(key)) {
            return cb(null, folder);
        }
    }
    cb(new Error("Invalid file fieldname"), null);
};
exports.multerDestination = multerDestination;
