import React from "react";
import ProtectedRoute from "../../protected-route";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyOCRPage = React.lazy(() => import("../../../pages/ocr"));

const LazyProtectedOCRPageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <ProtectedRoute>
      <LazyOCRPage />
    </ProtectedRoute>
  </React.Suspense>
);

export default LazyProtectedOCRPageWithFallback;
