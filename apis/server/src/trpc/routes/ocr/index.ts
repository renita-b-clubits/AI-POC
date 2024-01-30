import { trpc } from "../../trpc";
import { get } from "./get";
import { upload } from "./upload";
import { getOcrForID } from "./getOcrForID";

export const ocrRoutes = trpc.router({
  get,
  upload,
  getOcrForID,
});
