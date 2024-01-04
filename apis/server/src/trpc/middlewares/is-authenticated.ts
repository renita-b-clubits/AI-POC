import { TRPCError } from "@trpc/server";
import { getErrorMessage } from "../../utils/get-error-message";
import type { TRPC } from "../trpc";

export const isAuthenticated = (trpc: TRPC) =>
  trpc.middleware(async (opts) => {
    try {
      const { ctx } = opts;

      await ctx.req.authenticate(ctx.req);

      return opts.next({
        ctx: {
          user: ctx.req.user,
          userId: ctx.req.user.id,
          role: ctx.req.user.role,
        },
      });
    } catch (error) {
      console.log(getErrorMessage(error));

      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  });
