import React from "react";
import ProtectedRoute from "../../protected-route";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyAnomalyDetectionPage = React.lazy(
  () => import("../../../pages/anomaly-detection")
);

const LazyProtectedAnomalyDetectionPageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <ProtectedRoute>
      <LazyAnomalyDetectionPage />
    </ProtectedRoute>
  </React.Suspense>
);

export default LazyProtectedAnomalyDetectionPageWithFallback;
