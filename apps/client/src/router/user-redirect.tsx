import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../shared/hooks/use-auth";

export type UserRedirectProps = {
  children: React.ReactNode;
};

export const UserRedirect = (props: UserRedirectProps) => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth.state.user) return;

    navigate("/");
  }, [auth.state.user, navigate]);

  return <>{props.children}</>;
};

export default UserRedirect;
