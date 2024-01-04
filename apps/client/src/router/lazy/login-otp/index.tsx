import React from "react";
import UserRedirect from "../../user-redirect";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyLoginOtpPage = React.lazy(
  () => import("../../../pages/login-mobile-otp")
);

const LazyLoginOtpPageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <UserRedirect>
      <LazyLoginOtpPage />
    </UserRedirect>
  </React.Suspense>
);

export default LazyLoginOtpPageWithFallback;
