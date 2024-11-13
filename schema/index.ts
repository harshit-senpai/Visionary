import { z } from "zod";

export const requestData = z.object({
  prompt: z.string(),
  userAPIKey: z.string().optional(),
  iterativeMode: z.boolean(),
});

export const promptFormSchema = z.object({
  prompt: z.string(),
  iterativeMode: z.boolean(),
  isFetching: z.boolean(),
});
