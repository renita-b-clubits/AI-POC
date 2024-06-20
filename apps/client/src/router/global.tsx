import { createBrowserRouter } from "react-router-dom";
import GlobalLayout from "../layouts/global";
import LazyProtectedHomePageWithFallback from "./lazy/protected/home";
import LazyDemoLoginPageWithFallback from "./lazy/protected/demoLogin";
import LazyProtectedAnomalyDetectionPageWithFallback from "./lazy/protected/anomaly-detection";
import LazyProtectedChatBotPageWithFallback from "./lazy/protected/chat-bot";
import LazyProtectedComputerVisionPageWithFallback from "./lazy/protected/computer-vision";
import LazyProtectedDocumentExtractionPageWithFallback from "./lazy/protected/document-extraction";
import LazyProtectedLanguagePageWithFallback from "./lazy/protected/language";
import LazyProtectedVoicePageWithFallback from "./lazy/protected/voice";
import LazyProtectedOCRPageWithFallback from "./lazy/protected/ocr";
import LazyLoginOtpPageWithFallback from "./lazy/login-otp";
import React from "react";

const ScanUploadPage = React.lazy(() => import("../../src/pages/ocr-scan"));

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
    path: "scan-upload",
    element: <ScanUploadPage />,
  },

  {
    path: "/*",
    element: <GlobalLayout />,
    children: [
      {
        path: "",
        element: <LazyProtectedHomePageWithFallback />,
      },
      {
        path: "anomaly-detection",
        element: <LazyProtectedAnomalyDetectionPageWithFallback />,
      },
      {
        path: "ocr",
        element: <LazyProtectedOCRPageWithFallback />,
      },
      {
        path: "chat-bot",
        element: <LazyProtectedChatBotPageWithFallback />,
      },
      {
        path: "computer-vision",
        element: <LazyProtectedComputerVisionPageWithFallback />,
      },
      {
        path: "document-extraction",
        element: <LazyProtectedDocumentExtractionPageWithFallback />,
      },
      {
        path: "language",
        element: <LazyProtectedLanguagePageWithFallback />,
      },
      {
        path: "voice",
        element: <LazyProtectedVoicePageWithFallback />,
      },
    ],
  },
]);

export default router;
