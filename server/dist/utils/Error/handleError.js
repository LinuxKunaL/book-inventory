"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const handleErrorResponse = (error, res) => {
    const ErrorModified = error;
    console.log(ErrorModified.name, ErrorModified.message);
    res
        .status(ErrorModified.status || http_status_codes_1.default.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorModified.message });
};
exports.handleErrorResponse = handleErrorResponse;
