import { createBrowserRouter } from "react-router-dom";
import GlobalLayout from "../layouts/global";

import LazyDemoLoginPageWithFallback from "./lazy/protected/demoLogin";

import LazyProtectedOCRPageWithFallback from "./lazy/protected/ocr";
import LazyLoginOtpPageWithFallback from "./lazy/login-otp";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <LazyDemoLoginPageWithFallback />,
  },
  {
    path: "otp-login",
    element: <LazyLoginOtpPageWithFallback />,
  },

  {
    path: "/*",
    element: <GlobalLayout />,
    children: [
      {
        path: "ocr",
        element: <LazyProtectedOCRPageWithFallback />,
      },
    ],
  },
]);

export default router;
