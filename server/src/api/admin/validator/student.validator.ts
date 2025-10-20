import { date, z } from "zod";

const StudentZodSchema = z.object({
  _id: z.string().optional(),
  school: z.string(),
  admissionNumber: z.string(),
  studentName: z.string(),
  dateOfBirth: z.string(),

  gender: z.string(),
  classStandard: z.string(),
  section: z.string(),
  parentName: z.string(),

  address: z.object({
    state: z.string(),
    city: z.string(),
    street: z.string(),
    pinCode: z.string(),
  }),
});

export type TStudentData = z.infer<typeof StudentZodSchema>;
export const studentFieldsValidator = StudentZodSchema;
