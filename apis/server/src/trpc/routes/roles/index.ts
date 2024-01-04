import { trpc } from "../../trpc";
import { getMany } from "./get-many";

export const roleRoutes = trpc.router({
  getMany,
});
