import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().min(2),
  capacity: z.number().int().positive(),
});
