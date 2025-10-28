"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const school_model_1 = require("../../../models/school.model");
const AppError_1 = require("../../../utils/Error/AppError");
const getSchools = async (query) => {
    const page = query.page || 1;
    const search = query.search || "";
    const date = query.date || "";
    const type = query.type;
    try {
        const queryFIlter = {
            $and: [
                {
                    schoolName: { $regex: search, $options: "i" },
                },
                date
                    ? {
                        createdAt: new Date(date).toDateString(),
                    }
                    : {},
            ],
        };
        // type = 'plain' is indicate for request which coming for select tag options
        if (type == "plain") {
            return {
                schools: await school_model_1.MSchool.find().select("schoolName"),
            };
        }
        const result = await school_model_1.MSchool.find(queryFIlter)
            .skip((page - 1) * 10)
            .limit(10)
            .select("-__v");
        const totalSchools = await school_model_1.MSchool.countDocuments(queryFIlter);
        return {
            schools: result,
            totalSchools,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
exports.default = { getSchools };
