import React from "react";
import ProtectedRoute from "../../protected-route";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyComputerVisionPage = React.lazy(
  () => import("../../../pages/computer-vision")
);

const LazyProtectedComputerVisionPageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <ProtectedRoute>
      <LazyComputerVisionPage />
    </ProtectedRoute>
  </React.Suspense>
);

export default LazyProtectedComputerVisionPageWithFallback;
