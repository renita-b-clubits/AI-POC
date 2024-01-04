import React from "react";
import ProtectedRoute from "../../protected-route";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyLanguagePage = React.lazy(() => import("../../../pages/language"));

const LazyProtectedLanguagePageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <ProtectedRoute>
      <LazyLanguagePage />
    </ProtectedRoute>
  </React.Suspense>
);

export default LazyProtectedLanguagePageWithFallback;
