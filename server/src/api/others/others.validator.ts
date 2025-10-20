import { date, z } from "zod";

const SchoolZodSchema = z.object({
  schoolName: z.string(),
  contactPersonDetails: z.string(),
  schoolLocation: z.string(),
  boardOfEducation: z.string(),
  mailId: z.string(),
  coordinatorName: z.string(),
  coordinatorContact: z.string(),
});

export type TSchoolData = z.infer<typeof SchoolZodSchema>;
export const schoolFieldsValidator = SchoolZodSchema;
