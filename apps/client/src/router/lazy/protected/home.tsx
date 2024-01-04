import React from "react";
import ProtectedRoute from "../../protected-route";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyHomePage = React.lazy(() => import("../../../pages/home"));

const LazyProtectedHomePageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <ProtectedRoute>
      <LazyHomePage />
    </ProtectedRoute>
  </React.Suspense>
);

export default LazyProtectedHomePageWithFallback;
