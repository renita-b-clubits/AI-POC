import { trpc } from "../../trpc";
import { get } from "./get";
import { upload } from "./upload";
import { getOcrForID } from "./getOcrForID";
import { createQrID } from "./createQrID";
import { validateQR } from "./validateQR";
export const ocrRoutes = trpc.router({
  get,
  upload,
  getOcrForID,
  createQrID,
  validateQR,
});
