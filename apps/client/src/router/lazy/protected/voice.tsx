import React from "react";
import ProtectedRoute from "../../protected-route";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyVoicePage = React.lazy(() => import("../../../pages/voice"));

const LazyProtectedVoicePageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <ProtectedRoute>
      <LazyVoicePage />
    </ProtectedRoute>
  </React.Suspense>
);

export default LazyProtectedVoicePageWithFallback;
