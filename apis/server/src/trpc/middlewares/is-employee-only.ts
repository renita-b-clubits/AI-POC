import { TRPCError } from "@trpc/server";
import type { TRPC } from "../trpc";

export const isEmployeeOnly = (trpc: TRPC) =>
  trpc.middleware((opts) => {
    const { ctx } = opts;

    if (ctx.role !== "employee") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return opts.next({
      ctx: {
        role: "employee",
      },
    });
  });
