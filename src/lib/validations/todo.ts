import * as z from "zod";

export const todoCreateSchema = z.object({
  todo: z.string(),
  isCompleted: z.boolean().optional(),
  createdAt: z.date().optional(),
});

export const todoPatchSchema = z.object({
  todo: z.string().optional(),
  isCompleted: z.boolean().optional(),
  createdAt: z.date().optional(),
});
