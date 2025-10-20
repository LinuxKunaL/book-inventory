import bcrypt from "bcryptjs";
import httpCode from "http-status-codes";
import { MAdmin } from "../../models/admin.model";
import { MStudent } from "../../models/student.model";
import { AppError } from "../../utils/Error/AppError";
import {
  TAdminLogin,
  TRequestOtp,
  TStudentLogin,
  TStudentRegister,
} from "./auth.validator";
import { Types } from "mongoose";
import otherService from "../student/services/other.service";
import { MOtpModel } from "../../models/otp.model";
import sendSms from "../../functions/fast2sms.api";

const adminLogin = async (data: TAdminLogin) => {
  const admin = await MAdmin.findOne(data);

  if (!admin) {
    throw new AppError("Invalid credentials", httpCode.BAD_REQUEST);
  }

  const token = await admin.generateToken();
  return {
    status: "success",
    token,
  };
};

const adminMe = async (id: Types.ObjectId) => {
  const admin = await MAdmin.findById(id, {
    password: 0,
    __v: 0,
  });
  return {
    status: "success",
    data: admin,
  };
};

const adminVerify = async (id: string) => {
  try {
    const adminExist = await MAdmin.findOne({
      _id: id,
    });

    if (adminExist) {
      return {
        data: adminExist,
        success: true,
      };
    }
  } catch (error: any) {
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

const studentRegister = async (data: TStudentRegister) => {
  const { otp, mobileNumber, email, password, admissionNumber } = data;

  try {
    const otpExist = await MOtpModel.findOne({ mobileNumber, otp });

    if (!otpExist) {
      throw new AppError("Invalid OTP", httpCode.BAD_REQUEST);
    }

    await MOtpModel.deleteOne({ mobileNumber });

    const hashedPassword = bcrypt.hashSync(password, 10);

    await MStudent.findOneAndUpdate(
      { admissionNumber },
      {
        $set: {
          email,
          password: hashedPassword,
          mobileNumber,
          isRegistered: true,
        },
      }
    );

    return {
      status: "success",
    };
  } catch (error) {
    throw new AppError(error.message, error.status);
  }
};

const requestOtp = async (data: TRequestOtp) => {
  try {
    if (data.fromProfile == null) {
      const admissionExist = await MStudent.findOne({
        admissionNumber: data.admissionNumber.trim(),
      });

      if (!admissionExist) {
        throw new AppError("admission number not found", httpCode.NOT_FOUND);
      }

      const student = await MStudent.findOne({
        mobileNumber: data.mobileNumber,
      });

      if (student) {
        throw new AppError(
          "Mobile number already registered",
          httpCode.BAD_REQUEST
        );
      }

      if (student?.isRegistered) {
        throw new AppError("You have already registered", httpCode.BAD_REQUEST);
      }
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    console.log(otp);

    // sendSms look
    // sendSms(data.mobileNumber, otp);

    await MOtpModel.create({
      mobileNumber: data.mobileNumber,
      otp,
    });

    return {
      status: "success",
    };
  } catch (error) {
    console.log(error);

    throw new AppError(error.message, httpCode.INTERNAL_SERVER_ERROR);
  }
};

const studentLogin = async (data: TStudentLogin) => {
  try {
    const student = await MStudent.findOne({ mobileNumber: data.mobileNumber });

    if (!student) {
      throw new AppError("Invalid credentials", httpCode.BAD_REQUEST);
    }

    const isPasswordMatch = student.comparePassword(data.password);

    if (!isPasswordMatch) {
      throw new AppError("Invalid credentials", httpCode.BAD_REQUEST);
    }

    const token = student.generateToken();

    return {
      status: "success",
      token,
    };
  } catch (error) {
    throw new AppError(error.message, httpCode.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get a student details
 * @param {Types.ObjectId} id - The student id.
 */
const studentMe = async (id: Types.ObjectId) => {
  const student = await MStudent.findById(id)
    .select(
      "studentName email gender admissionNumber school mobileNumber classStandard section notificationCount streak lastStreakUpdate"
    )
    .populate({
      path: "school",
      select: "schoolName",
    });
  otherService.streakCounter(student);
  return {
    status: "success",
    data: student,
  };
};

/**
 * Verify a every request from student
 * @param {string} id - The student id.
 */
const studentVerify = async (id: string) => {
  try {
    const studentExist = await MStudent.findById(id);

    if (studentExist) {
      return {
        data: studentExist,
        success: true,
      };
    }
  } catch (error: any) {
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

const updateStudent = async (userId: Types.ObjectId, data: any) => {
  try {
    const otpExist = await MOtpModel.findOne({
      mobileNumber: data.mobileNumber,
      otp: data.otp,
    });

    if (!otpExist) {
      throw new AppError("Invalid OTP Entered", httpCode.BAD_REQUEST);
    }

    await MStudent.findByIdAndUpdate(
      userId,
      {
        $set: {
          studentName: data.studentName,
          email: data.email,
          mobileNumber: data.mobileNumber,
        },
      },
      {
        new: true,
      }
    );

    await MOtpModel.deleteOne({ mobileNumber: data.mobileNumber });

    return {
      status: "success",
    };
  } catch (error) {
    throw new AppError(error.message, httpCode.BAD_REQUEST);
  }
};

const updateStudentPassword = async (userId: Types.ObjectId, data: any) => {
  try {
    const student = await MStudent.findById(userId);
    const isPasswordMatch = student.comparePassword(data.currentPassword);

    if (!isPasswordMatch) {
      throw new AppError("Invalid Old Password", httpCode.BAD_REQUEST);
    }
    const hashedPassword = bcrypt.hashSync(data.newPassword, 10);
    await MStudent.findByIdAndUpdate(userId, {
      $set: {
        password: hashedPassword,
      },
    });
    return {
      status: "success",
    };
  } catch (error) {
    throw new AppError(error.message, httpCode.BAD_REQUEST);
  }
};

export default {
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
