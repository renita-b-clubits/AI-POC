import { ZodObject, z } from "zod";

// @ts-ignore
export const baseGetManyOutput = <T extends unknown>(schema: ZodObject<T>) =>
  z.object({
    totalCount: z.number(),
    items: z.array(schema),
  });
