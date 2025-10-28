"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const school_service_1 = __importDefault(require("../services/school.service"));
const handleError_1 = require("../../../utils/Error/handleError");
const getSchools = async (req, res) => {
    try {
        const query = req.query;
        const result = await school_service_1.default.getSchools(query);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
exports.default = { getSchools };
