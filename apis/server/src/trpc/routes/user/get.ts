import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type User = RouterOutput["user"]["get"];

export const get = protectedProcedure.mutation(async ({ ctx, input }) => {
  try {
    const where =
      ctx.role === "admin"
        ? { role: { name: "employee" } }
        : {
            id: ctx.userId,
          };

    const employees = await prisma.user.findFirstOrThrow({
      select: {
        id: true,
        name: true,
        username: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        email: true,
        mobile: true,
        expiryTime: true,
        twoFactor: true,
      },
      where,
    });

    return employees;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
