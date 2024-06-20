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
      id: z.string().optional(),
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
          qrId: input.id || null,
        },
        select: {
          extractedData: true,
          uploadedData: true,
        },
      });
      if (input.id) {
        await prisma.qrOcr.update({
          data: {
            isUploaded: true,
          },
          where: {
            qrId: input.id,
            userId: input.userID,
          },
        });
      }
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: JSON.stringify(error),
      });
    }
  });
