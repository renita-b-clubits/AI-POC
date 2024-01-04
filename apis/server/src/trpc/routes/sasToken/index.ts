import { trpc } from "../../trpc";
import { read } from "./get";
export const sasTokenRoutes = trpc.router({
  read,
});
