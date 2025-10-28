"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const others_service_1 = __importDefault(require("./others.service"));
const others_validator_1 = require("./others.validator");
const zodErrorFormat_1 = require("../../utils/Error/zodErrorFormat");
const handleError_1 = require("../../utils/Error/handleError");
const enum_1 = require("../../types/enum");
const registerSchool = async (req, res) => {
    const { error, data } = others_validator_1.schoolFieldsValidator.safeParse(req.body);
    if (error) {
        const result = (0, zodErrorFormat_1.zodError)(error.errors);
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
        return;
    }
    try {
        const result = await others_service_1.default.registerSchool(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const getUploads = async (req, res) => {
    try {
        const { type, filename } = req.query;
        var file;
        if (type == enum_1.EFileType.THUMBNAIL) {
            file = await others_service_1.default.getThumbnail(filename);
        }
        if (type == enum_1.EFileType.RESOURCE) {
            file = await others_service_1.default.getResource(filename);
        }
        if (type == enum_1.EFileType.VIDEO) {
            return await others_service_1.default.getVideo(req, res);
        }
        res.status(http_status_codes_1.default.OK).sendFile(file);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
exports.default = { registerSchool, getUploads };
