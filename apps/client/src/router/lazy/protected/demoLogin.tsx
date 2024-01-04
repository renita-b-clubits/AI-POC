import React from "react";
import ProtectedRoute from "../../protected-route";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyDemoLoginPage = React.lazy(() => import("../../../pages/demo-login"));

const LazyProtectedDemoLoginPageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <ProtectedRoute>
      <LazyDemoLoginPage />
    </ProtectedRoute>
  </React.Suspense>
);

export default LazyProtectedDemoLoginPageWithFallback;
