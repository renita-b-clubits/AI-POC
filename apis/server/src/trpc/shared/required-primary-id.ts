import { z } from "zod";

export const requiredPrimaryId = z.object({
  id: z.number(),
});
