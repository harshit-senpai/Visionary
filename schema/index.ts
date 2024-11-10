import { z } from "zod";

export const requestData = z.object({
  prompt: z.string(),
  userAPIKey: z.string().optional(),
  iterativeMode: z.boolean(),
});
