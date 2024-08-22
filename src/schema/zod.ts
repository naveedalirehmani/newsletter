import { z } from "zod";

export const articleFilterSchema = z.object({
  keyword: z.string().min(1, { message: "Keyword is required" }),
  dateRange: z
    .object({
      from: z.date({ required_error: "Start date is required." }).optional(),
      to: z.date({ required_error: "End date is required." }).optional(),
    })
    .optional(),
  source: z.enum(["newsApi", "theGuardian", "nyTimes", "all"]).optional(),
  category: z.string().optional(),
});
