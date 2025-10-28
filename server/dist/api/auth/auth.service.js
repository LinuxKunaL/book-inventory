"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const admin_model_1 = require("../../models/admin.model");
const student_model_1 = require("../../models/student.model");
const AppError_1 = require("../../utils/Error/AppError");
const other_service_1 = __importDefault(require("../student/services/other.service"));
const otp_model_1 = require("../../models/otp.model");
const adminLogin = async (data) => {
    const admin = await admin_model_1.MAdmin.findOne(data);
    if (!admin) {
        throw new AppError_1.AppError("Invalid credentials", http_status_codes_1.default.BAD_REQUEST);
    }
    const token = await admin.generateToken();
    return {
        status: "success",
        token,
    };
};
const adminMe = async (id) => {
    const admin = await admin_model_1.MAdmin.findById(id, {
        password: 0,
        __v: 0,
    });
    return {
        status: "success",
        data: admin,
    };
};
const adminVerify = async (id) => {
    try {
        const adminExist = await admin_model_1.MAdmin.findOne({
            _id: id,
        });
        if (adminExist) {
            return {
                data: adminExist,
                success: true,
            };
        }
    }
    catch (error) {
        console.log(error.message);
        if (error.message === "invalid signature") {
            return { error: "Invalid signature" };
        }
        if (error.message === "invalid token") {
            return { error: "Invalid token" };
        }
        return { error: error.message };
    }
    return {
        status: "success",
    };
};
const studentRegister = async (data) => {
    const { otp, mobileNumber, email, password, admissionNumber } = data;
    try {
        const otpExist = await otp_model_1.MOtpModel.findOne({ mobileNumber, otp });
        if (!otpExist) {
            throw new AppError_1.AppError("Invalid OTP", http_status_codes_1.default.BAD_REQUEST);
        }
        await otp_model_1.MOtpModel.deleteOne({ mobileNumber });
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        await student_model_1.MStudent.findOneAndUpdate({ admissionNumber }, {
            $set: {
                email,
                password: hashedPassword,
                mobileNumber,
                isRegistered: true,
            },
        });
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message, error.status);
    }
};
const requestOtp = async (data) => {
    try {
        if (data.fromProfile == null) {
            const admissionExist = await student_model_1.MStudent.findOne({
                admissionNumber: data.admissionNumber.trim(),
            });
            if (!admissionExist) {
                throw new AppError_1.AppError("admission number not found", http_status_codes_1.default.NOT_FOUND);
            }
            const student = await student_model_1.MStudent.findOne({
                mobileNumber: data.mobileNumber,
            });
            if (student) {
                throw new AppError_1.AppError("Mobile number already registered", http_status_codes_1.default.BAD_REQUEST);
            }
            if (student?.isRegistered) {
                throw new AppError_1.AppError("You have already registered", http_status_codes_1.default.BAD_REQUEST);
            }
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);
        // sendSms look
        // sendSms(data.mobileNumber, otp);
        await otp_model_1.MOtpModel.create({
            mobileNumber: data.mobileNumber,
            otp,
        });
        return {
            status: "success",
        };
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.AppError(error.message, http_status_codes_1.default.INTERNAL_SERVER_ERROR);
    }
};
const studentLogin = async (data) => {
    try {
        const student = await student_model_1.MStudent.findOne({ mobileNumber: data.mobileNumber });
        if (!student) {
            throw new AppError_1.AppError("Invalid credentials", http_status_codes_1.default.BAD_REQUEST);
        }
        const isPasswordMatch = student.comparePassword(data.password);
        if (!isPasswordMatch) {
            throw new AppError_1.AppError("Invalid credentials", http_status_codes_1.default.BAD_REQUEST);
        }
        const token = student.generateToken();
        return {
            status: "success",
            token,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message, http_status_codes_1.default.INTERNAL_SERVER_ERROR);
    }
};
/**
 * Get a student details
 * @param {Types.ObjectId} id - The student id.
 */
const studentMe = async (id) => {
    const student = await student_model_1.MStudent.findById(id)
        .select("studentName email gender admissionNumber school mobileNumber classStandard section notificationCount streak lastStreakUpdate")
        .populate({
        path: "school",
        select: "schoolName",
    });
    other_service_1.default.streakCounter(student);
    return {
        status: "success",
        data: student,
    };
};
/**
 * Verify a every request from student
 * @param {string} id - The student id.
 */
const studentVerify = async (id) => {
    try {
        const studentExist = await student_model_1.MStudent.findById(id);
        if (studentExist) {
            return {
                data: studentExist,
                success: true,
            };
        }
    }
    catch (error) {
        console.log(error.message);
        if (error.message === "invalid signature") {
            return { error: "Invalid signature" };
        }
        if (error.message === "invalid token") {
            return { error: "Invalid token" };
        }
        return { error: error.message };
    }
    return {
        status: "success",
    };
};
const updateStudent = async (userId, data) => {
    try {
        const otpExist = await otp_model_1.MOtpModel.findOne({
            mobileNumber: data.mobileNumber,
            otp: data.otp,
        });
        if (!otpExist) {
            throw new AppError_1.AppError("Invalid OTP Entered", http_status_codes_1.default.BAD_REQUEST);
        }
        await student_model_1.MStudent.findByIdAndUpdate(userId, {
            $set: {
                studentName: data.studentName,
                email: data.email,
                mobileNumber: data.mobileNumber,
            },
        }, {
            new: true,
        });
        await otp_model_1.MOtpModel.deleteOne({ mobileNumber: data.mobileNumber });
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message, http_status_codes_1.default.BAD_REQUEST);
    }
};
const updateStudentPassword = async (userId, data) => {
    try {
        const student = await student_model_1.MStudent.findById(userId);
        const isPasswordMatch = student.comparePassword(data.currentPassword);
        if (!isPasswordMatch) {
            throw new AppError_1.AppError("Invalid Old Password", http_status_codes_1.default.BAD_REQUEST);
        }
        const hashedPassword = bcryptjs_1.default.hashSync(data.newPassword, 10);
        await student_model_1.MStudent.findByIdAndUpdate(userId, {
            $set: {
                password: hashedPassword,
            },
        });
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message, http_status_codes_1.default.BAD_REQUEST);
    }
};
exports.default = {
    adminMe,
    adminVerify,
    adminLogin,
    requestOtp,
    studentLogin,
    studentMe,
    updateStudent,
    studentVerify,
    studentRegister,
    updateStudentPassword,
};
