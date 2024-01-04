import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import superjson from "superjson";
import { isAdminOnly } from "./middlewares/is-admin-only";
import { isAuthenticated } from "./middlewares/is-authenticated";
import { isEmployeeOnly } from "./middlewares/is-employee-only";

export const getTRPCContext = ({ req, res }: CreateFastifyContextOptions) => {
  return {
    req,
    res,
    userId: req.user?.id,
    role: req.user?.role,
    user: req.user,
  };
};

export type Context = inferAsyncReturnType<typeof getTRPCContext>;

export const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
});
export type TRPC = typeof trpc;

export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(isAuthenticated(trpc));
export const adminOnlyProcedure = trpc.procedure
  .use(isAuthenticated(trpc))
  .use(isAdminOnly(trpc));
export const employeeOnlyProcedure = trpc.procedure
  .use(isAuthenticated(trpc))
  .use(isEmployeeOnly(trpc));
