import React from "react";
import UserRedirect from "../../user-redirect";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyLoginPage = React.lazy(() => import("../../../pages/login"));

const LazyLoginPageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <UserRedirect>
      <LazyLoginPage />
    </UserRedirect>
  </React.Suspense>
);

export default LazyLoginPageWithFallback;
