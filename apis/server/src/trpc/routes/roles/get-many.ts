import { TRPCError } from "@trpc/server";
import { prisma } from "../../../db/prisma";
import { getErrorMessage } from "../../../utils/get-error-message";
import { RouterOutput } from "../../router";

import { protectedProcedure } from "../../trpc";

export type Role = RouterOutput["role"]["getMany"][0];

export const getMany = protectedProcedure.mutation(async ({ ctx, input }) => {
  try {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        name: {
          not: "system",
        },
      },
    });

    return roles;
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
