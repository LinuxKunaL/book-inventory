import { date, z } from "zod";

const CoursesZodSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  duration: z.string(),
  difficulty: z.string(),
  visibility: z.enum(["public", "private"]),
  thumbnail: z.string(),
  lessons: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      video: z.object({
        name: z.string(),
        duration: z.string(),
      }),
      resources: z
        .array(
          z.object({
            name: z.string(),
            size: z.string(),
          })
        )
        .optional(),
    })
  ),
  lessonsLength: z.string(),
  studentEnrolled: z.number().optional(),
  deletedFiles: z
    .object({
      video: z.array(z.string()).optional(),
      resources: z.array(z.string()).optional(),
      thumbnail: z.string().optional(),
    })
    .optional(),
});

export type TCourseData = z.infer<typeof CoursesZodSchema>;
export const coursesFieldsValidator = CoursesZodSchema;
