import { z } from "zod";

export const articleFilterSchema = z.object({
  keyword: z.string().min(1, { message: "Keyword is required" }),
  category: z.string().optional(),
  source: z.string().optional(),
  provider: z.enum([
    "newsApi",
    "theGuardian",
    "nyTimes",
    "all",
  ]).optional(),
});
