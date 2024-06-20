import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { protectedProcedure } from "../../trpc";

export const createQrID = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      userId: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const otpExpiry = new Date();

      otpExpiry.setSeconds(otpExpiry.getSeconds() + 300); // 5 min
      const user = await prisma.qrOcr.create({
        data: {
          qrId: input.id,
          userId: input.userId,
          isUploaded: false,
          expiryAt: otpExpiry,
        },
        select: {
          qrId: true,
        },
      });
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: JSON.stringify(error),
      });
    }
  });
