import { ZodIssue } from "zod";

export const zodError = (error: ZodIssue[]) => {
  const errors: { message: string; path: string | any }[] = [];

  error.forEach((err: ZodIssue) => {
    errors.push({ message: err.message, path: err.path[0] });
  });

  const readableString = errors
    .map((e) => `${e.path}: ${e.message}`)
    .join(" | ");

  return readableString
};
