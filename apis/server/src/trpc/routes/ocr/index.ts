import { trpc } from "../../trpc";
import { get } from "./get";
import { upload } from "./upload";
export const ocrRoutes = trpc.router({
  get,
  upload,
});
