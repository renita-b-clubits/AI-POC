import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { protectedProcedure } from "../../trpc";

export const updateUserSchema = z.object({
  twoFactor: z.boolean().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  roleId: z.number().optional(),
  id: z.number().optional(),
  customGroup: z.array(z.number()).optional(),
  mobile: z.string().optional(),
});

export type updateUser = z.infer<typeof updateUserSchema>;

export const update = protectedProcedure
  .input(updateUserSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const twoFactor = await prisma.user.update({
        where: { id: input.id ? input.id : ctx.userId },
        data: {
          twoFactor: input.twoFactor,
          name: input.name,
          email: input.email,
          username: input.username,
          roleId: input.roleId,

          mobile: input.mobile,
        },
        select: {
          id: true,
          name: true,

          role: {
            select: {
              id: true,
              name: true,
            },
          },
          username: true,
          mobile: true,
          email: true,
          twoFactor: true,
        },
      });

      return twoFactor;
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
