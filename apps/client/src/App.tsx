import { RouterProvider } from "react-router-dom";
import globalRouter from "./router/global";
import { AuthContext, useAuth } from "./shared/hooks/use-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const App = () => {
  const auth = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth}>
        <RouterProvider router={globalRouter} />
      </AuthContext.Provider>
      {/* <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-left"
        position="bottom"
      /> */}
    </QueryClientProvider>
  );
};

export default App;
