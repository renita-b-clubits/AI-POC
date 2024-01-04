import { TRPCError } from "@trpc/server";
import type { TRPC } from "../trpc";

export const isAdminOnly = (trpc: TRPC) =>
  trpc.middleware(async (opts) => {
    const { ctx } = opts;

    if (ctx.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return opts.next({
      ctx: {
        role: "admin",
      },
    });
  });
