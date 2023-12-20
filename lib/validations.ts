import * as z from "zod";

export const CardSchema = z.object({
  title: z.string().min(3).max(20),
});

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
});
