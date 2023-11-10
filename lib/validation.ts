import * as z from "zod";

export const formSchema = z.object({
  details: z.string().min(1).max(200),
  title: z.string().min(1).max(30),
  status: z.string(),
});
