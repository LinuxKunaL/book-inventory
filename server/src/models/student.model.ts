import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import config from "../config/app.config";
import bcrypt from "bcryptjs";

export interface IStudent extends Document {
  studentName: string;
  admissionNumber: string;
  dateOfBirth: string;
  classStandard: string;
  section: string;
  gender: string;
  parentName: string;
  isRegistered: boolean;
  mobileNumber?: string;
  email?: string;
  password?: string;
  school?: mongoose.Types.ObjectId;
  notificationCount?: number;
  address?: {
    state: string;
    city: string;
    street: string;
    pinCode: string;
  };
  streak?: number;
  lastStreakUpdate?: Date;
  generateToken(): string;
  comparePassword(password: string): boolean;
}

const studentSchema = new mongoose.Schema<IStudent>(
  {
    studentName: { type: String, required: true },
    mobileNumber: { type: String },
    email: { type: String },
    admissionNumber: { type: String, required: true, unique: true },
    password: { type: String },
    dateOfBirth: { type: String, required: true },

    school: { type: Schema.Types.ObjectId, ref: "Schools" },

    classStandard: { type: String, required: true },
    section: { type: String, required: true },
    gender: { type: String, required: true },

    parentName: { type: String, required: true },

    address: {
      state: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      pinCode: { type: String, required: true },
    },

    isRegistered: { type: Boolean, default: false },
    notificationCount: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastStreakUpdate: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

studentSchema.methods.generateToken = function () {
  const payload = {
    studentId: this._id.toString(),
    studentName: this.studentName,
  };

  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  return token;
};

studentSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

export const MStudent = mongoose.model("Student", studentSchema);
