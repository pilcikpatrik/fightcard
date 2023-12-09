import * as z from "zod";

export const CardSchema = z.object({
  title: z.string().min(3).max(20),
});