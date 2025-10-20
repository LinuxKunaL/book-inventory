import { z } from "zod";

const adminLoginZodSchema = z.object({
  username: z.string(),
  gmail: z.string(),
  password: z.string().min(6),
});

export type TAdminLogin = z.infer<typeof adminLoginZodSchema>;
export const adminLoginValidator = adminLoginZodSchema;

const studentRegZodSchema = z.object({
  admissionNumber: z.string(),
  otp: z.string(),
  mobileNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type TStudentRegister = z.infer<typeof studentRegZodSchema>;
export const studentRegValidator = studentRegZodSchema;

const requestOtpZodSchema = z.object({
  mobileNumber: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
  admissionNumber: z.string().min(1, "Admission number is required"),
  fromProfile: z.boolean().default(false).optional(),
});

export type TRequestOtp = z.infer<typeof requestOtpZodSchema>;
export const requestOtpValidator = requestOtpZodSchema;

export type TStudentLogin = {
  mobileNumber: string;
  password: string;
};
