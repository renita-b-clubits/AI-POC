import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";
import { protectedProcedure } from "../../trpc";

export type User = RouterOutput["user"]["userMany"][0];

export const userMany = protectedProcedure.mutation(async ({ ctx }) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        role: {
          name: {
            not: "system",
          },
        },
        id: {
          not: ctx.userId,
        },
      },
    });

    return user;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
