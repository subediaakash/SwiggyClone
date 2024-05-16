import { z } from "zod";

export const foodSchema = z.object({
  name: z.string(),
  description: z.string(),
});
