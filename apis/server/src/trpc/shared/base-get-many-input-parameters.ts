import { z } from "zod";

export const baseGetManyInputParameters = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  limit: z.number(),
  page: z.number(),
});
