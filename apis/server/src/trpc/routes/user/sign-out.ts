import { TRPCError } from "@trpc/server";
import { getErrorMessage } from "../../../utils/get-error-message";
import { protectedProcedure } from "../../trpc";

export const signOut = protectedProcedure.mutation(async ({ ctx }) => {
  try {
    if (ctx.user) {
      ctx.res.clearCookie("refreshToken");

      throw new TRPCError({ code: "UNAUTHORIZED" });
    } else throw new TRPCError({ code: "UNAUTHORIZED" });
  } catch (error) {
    if (getErrorMessage(error) !== "UNAUTHORIZED") {
      console.error(getErrorMessage(error));

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});
