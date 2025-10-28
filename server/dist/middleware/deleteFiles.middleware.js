"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllFiles = exports.deleteFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * @function deleteFiles -
 * @description This middleware is used to delete old files of uploaded course
 * */
const deleteFiles = (req, res, next) => {
    const files = req.body.deletedFiles;
    const baseDir = path_1.default.resolve("./src/uploads");
    if (files === undefined) {
        next();
        return;
    }
    if (files?.resources?.length !== 0) {
        files.resources?.map((resource) => {
            if (resource != "") {
                fs_1.default.unlinkSync(`${baseDir}/resources/${resource}`);
            }
        });
    }
    if (files?.thumbnail) {
        if (files?.thumbnail != "") {
            fs_1.default.unlinkSync(`${baseDir}/thumbnails/${files?.thumbnail}`);
        }
    }
    if (files.video?.length !== 0) {
        files.video?.map((video) => {
            if (video != "") {
                fs_1.default.unlinkSync(`${baseDir}/videos/${video}`);
            }
        });
    }
    next();
};
exports.deleteFiles = deleteFiles;
const deleteAllFiles = (course) => {
    const thumbnailPath = course.thumbnail;
    const videosPath = course.lessons.map((lesson) => lesson.video);
    const resourcesPath = course.lessons.map((lesson) => lesson.resources).flat();
    const baseDir = path_1.default.resolve("./src/uploads");
    if (thumbnailPath != "") {
        fs_1.default.unlinkSync(`${baseDir}/thumbnails/${thumbnailPath}`);
    }
    if (videosPath.length !== 0) {
        videosPath.map((video) => {
            if (video.name != "") {
                fs_1.default.unlinkSync(`${baseDir}/videos/${video.name}`);
            }
        });
    }
    if (resourcesPath.length !== 0) {
        resourcesPath.map((resource) => {
            if (resource.name != "") {
                fs_1.default.unlinkSync(`${baseDir}/resources/${resource.name}`);
            }
        });
    }
};
exports.deleteAllFiles = deleteAllFiles;
