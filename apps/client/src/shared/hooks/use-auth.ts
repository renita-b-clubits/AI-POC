import React from "react";
import { Account as User } from "../../apis/mocks/account/data";

export type AUTH_ACTION =
  | {
      type: "set-user";
      payload: User;
    }
  | {
      type: "reset-user";
    };

export type AuthState = {
  user?: User;
};

export const reducer = (state: AuthState, action: AUTH_ACTION): AuthState => {
  switch (action.type) {
    case "set-user": {
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    }
    case "reset-user": {
      localStorage.removeItem("auth");
      return { ...state, user: undefined };
    }
    default:
      return { ...state };
  }
};

export type AuthContextValue = {
  state: AuthState;
  dispatcher: React.Dispatch<AUTH_ACTION>;
};

export const AuthContext = React.createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) throw new Error();

  return context;
};

export const useAuth = (): AuthContextValue => {
  const [state, dispatcher] = React.useReducer(reducer, {
    user: localStorage.getItem("auth")
      ? (JSON.parse(localStorage.getItem("auth") as string) as unknown as User)
      : undefined,
  });

  return { state, dispatcher };
};
