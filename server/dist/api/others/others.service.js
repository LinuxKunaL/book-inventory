"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = require("../../utils/Error/AppError");
const school_model_1 = require("../../models/school.model");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const registerSchool = async (data) => {
    try {
        const result = await school_model_1.MSchool.create(data);
        return {
            status: "success",
        };
    }
    catch (error) {
        if (error.code === 11000) {
            const key = Object.keys(error.keyValue)[0];
            const modifiedKay = key.replace(/([a-z])([A-Z])/g, "$1 $2");
            throw new AppError_1.AppError(`School already exist : ${modifiedKay}`, http_status_codes_1.default.BAD_REQUEST);
        }
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getThumbnail = async (filename) => {
    try {
        return path_1.default.join(__dirname, "../../uploads/thumbnails/", filename);
    }
    catch (error) {
        return "";
    }
};
const getResource = async (filename) => {
    try {
        return path_1.default.join(__dirname, "../../uploads/resources/", filename);
    }
    catch (error) {
        return "";
    }
};
const getVideo = async (req, res) => {
    const { filename } = req.query;
    const videoPath = path_1.default.join(__dirname, "../../uploads/videos", filename);
    if (!fs_1.default.existsSync(videoPath)) {
        throw new AppError_1.AppError("Video not found", http_status_codes_1.default.NOT_FOUND);
    }
    const stat = fs_1.default.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (!range) {
        res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        });
        fs_1.default.createReadStream(videoPath).pipe(res);
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
    fs_1.default.createReadStream(videoPath, { start, end }).pipe(res);
};
exports.default = { registerSchool, getThumbnail, getResource, getVideo };
