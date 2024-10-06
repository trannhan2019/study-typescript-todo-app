import { z } from "zod";

export const todoAddSchema = z.object({
  title: z.string().min(2, { message: "Title should have at least 2 letters" }),
});
