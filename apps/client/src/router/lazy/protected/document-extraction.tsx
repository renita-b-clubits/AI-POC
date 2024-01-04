import React from "react";
import ProtectedRoute from "../../protected-route";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyDocumentExtractionPage = React.lazy(
  () => import("../../../pages/document-extraction")
);

const LazyProtectedDocumentExtractionPageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <ProtectedRoute>
      <LazyDocumentExtractionPage />
    </ProtectedRoute>
  </React.Suspense>
);

export default LazyProtectedDocumentExtractionPageWithFallback;
