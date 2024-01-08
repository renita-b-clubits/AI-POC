import React from "react";
import ReactDOM from "react-dom/client";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "server/src/trpc/router";
import superjson from "superjson";
import App from "./App.tsx";
import "./index.scss";
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

let token: string | undefined;

export const resetToken = () => {
  localStorage.removeItem("token");
  token = undefined;
};

export const setToken = (newToken: string) => {
  localStorage.setItem("token", newToken);
  token = newToken;
};

export const getAuthorizationHeaders = () => {
  return {
    Authorization: `Bearer ${token || localStorage.getItem("token") || ""}`,
  };
};

export const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "/trpc",
      maxURLLength: 95,
      async headers() {
        return {
          "Access-Control-Allow-Credentials": "true",
          ...getAuthorizationHeaders(),
        };
      },
    }),
  ],
});

const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <App />
    </React.StrictMode>{" "}
  </GoogleOAuthProvider>
);
