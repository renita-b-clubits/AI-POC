import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../../db/prisma";
import { protectedProcedure } from "../../trpc";

export const upload = protectedProcedure
  .input(
    z.object({
      extractedData: z.string(),
      uploadedData: z.string(),
      type: z.string(),
      userID: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const user = await prisma.ocr.create({
        data: {
          extractedData: input.extractedData,
          uploadedData: input.uploadedData,
          type: input.type,
          userId: input.userID,
          createdById: input.userID,
          updatedById: input.userID,
        },
        select: {
          extractedData: true,
          uploadedData: true,
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
