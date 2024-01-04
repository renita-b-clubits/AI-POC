import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { userRoutes } from "./routes/user";
import { trpc } from "./trpc";
import { roleRoutes } from "./routes/roles";
import { sasTokenRoutes } from "./routes/sasToken";
import { ocrRoutes } from "./routes/ocr";

export const appRouter = trpc.router({
  user: userRoutes,
  role: roleRoutes,
  sasToken: sasTokenRoutes,
  ocr: ocrRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
