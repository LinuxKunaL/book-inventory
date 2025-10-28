"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (err, req, res, next) => {
    console.error(err.message);
    res.status(400).json({ error: err.message || "Something went wrong" });
};
exports.handleError = handleError;
