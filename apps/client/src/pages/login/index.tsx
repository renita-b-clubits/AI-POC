import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { accountLogin } from "./service";
import { useAuthContext } from "../../shared/hooks/use-auth";
import React from "react";
import Username, { usernameSchema } from "./form/fields/username";
import Password, { passwordSchema } from "./form/fields/password";
import { z } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginSchema = usernameSchema.merge(passwordSchema);

export type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: accountLogin,
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login.mutate({
      email: data.username,
      password: data.password,
    });
  };

  React.useEffect(() => {
    if (!login.data) return;

    if (login.data.data) {
      auth.dispatcher({ type: "set-user", payload: login.data.data });
    }
  }, [auth, login.data]);

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <>
      <div className="vstack gap-3">
        <div>
          <h5>Login</h5>
        </div>
        <>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Username placeholder="John" />

              <Password placeholder="***********" />

              <div className="hstack justify-content-between align-items-baseline mb-3">
                <FormGroup check inline>
                  <Input type="checkbox" />
                  <Label check>Remember me</Label>
                </FormGroup>

                <NavLink to="forgot-password">
                  <a className="link-primary">Forgot Password</a>
                </NavLink>
              </div>

              <Button
                type="submit"
                color="primary"
                className="text-white w-100 mt-4"
                onClick={methods.handleSubmit(onSubmit)}
              >
                Sign In
              </Button>

              <p className="text-end mt-2">
                <a href="" className="link-body-emphasis">
                  Need help ?
                </a>
              </p>
            </Form>
          </FormProvider>
        </>
        <Button
          color="primary"
          className="text-white w-100 mt-2"
          onClick={() => {
            navigate("/login/otp");
          }}
        >
          Log in with OTP
        </Button>
      </div>
    </>
  );
};

export default Login;
