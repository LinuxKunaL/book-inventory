import { z } from "zod";

const questionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
  explanation: z.string().optional(),
});

export const quizzesSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  visibility: z.string(),
  timeLimit: z.number(),
  passingScore: z.number(),
  difficulty: z.string(),
  assignedGroups: z.array(z.string()),
  questions: z.array(questionSchema),
  questionsLength: z.number().optional(),
});

export type TQuizzes = z.infer<typeof quizzesSchema>;
export const quizzesFieldsValidator = quizzesSchema;
