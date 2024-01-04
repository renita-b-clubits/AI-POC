import React from "react";
import ProtectedRoute from "../../protected-route";
import LoadingIndicator from "../../../components/loading-indicator";

const LazyChatBotPage = React.lazy(() => import("../../../pages/chat-bot"));

const LazyProtectedChatBotPageWithFallback = () => (
  <React.Suspense fallback={<LoadingIndicator />}>
    <ProtectedRoute>
      <LazyChatBotPage />
    </ProtectedRoute>
  </React.Suspense>
);

export default LazyProtectedChatBotPageWithFallback;
