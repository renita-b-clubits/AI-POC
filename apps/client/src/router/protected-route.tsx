import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../shared/hooks/use-auth";

export type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (auth.state.user) return;
    if (auth.state.user === undefined) {
      navigate("/login");
      return;
    }
  }, [auth.state.user, navigate]);

  return <>{props.children}</>;
};

export default ProtectedRoute;
