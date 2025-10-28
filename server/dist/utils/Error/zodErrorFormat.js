"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodError = void 0;
const zodError = (error) => {
    const errors = [];
    error.forEach((err) => {
        errors.push({ message: err.message, path: err.path[0] });
    });
    const readableString = errors
        .map((e) => `${e.path}: ${e.message}`)
        .join(" | ");
    return readableString;
};
exports.zodError = zodError;
