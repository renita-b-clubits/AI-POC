// [5:03 PM] Vignesh S, cluBITS
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";

import {
  Container,
  Box,
  Grid,
  Stack,
  Button,
  Hidden,
  Checkbox,
  Link,
} from "@mui/material";

import Typography from "@mui/material/Typography";

import {
  FormContainer,
  SubmitHandler,
  TextFieldElement,

  // CheckboxElement
} from "react-hook-form-mui";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";

import { client, setToken } from "../main";

import React from "react";

import { gapi } from "gapi-script";

import { useAuthContext } from "../shared/hooks/use-auth";
import { handleTRPCError } from "../utils/handle-trpc-error";

const loginValidationSchema = z.object({
  username: z.string().min(1, { message: "User Name is required" }),

  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginValidationSchema = z.infer<typeof loginValidationSchema>;

export const LoginPage = () => {
  React.useEffect(() => {
    function start() {
      const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

      gapi.client

        .init({
          clientId: clientId,

          scope: "",
        })

        .then(() => {
          console.log("Initialization successful");
        })

        .catch((error: any) => {
          console.log("Handle initialization:", error);
        });
    }

    gapi.load("client:auth", start);
  });

  const auth = useAuthContext();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginValidationSchema> = async (data) => {
    try {
      const { user, token } = await client.user.signIn.mutate({
        username: data.username,

        password: data.password,
      });

      if (token !== undefined) {
        setToken(token);

        auth.dispatcher({ type: "set-user", payload: user });

        navigate("/ocr");
      } else {
        toast("Successfully Otp send The Register Email");

        navigate("/otp", {
          state: data,
        });
      }
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item lg={7} sx={{ background: "#EFFBFF" }}>
        <Hidden lgUp={false} lgDown={true}>
          <Stack
            justifyContent="center"
            alignItems="center"
            style={{ height: "100vh" }}
          >
            <img
              src="/images/artificial-intelligence.svg"
              alt="Login hero"
              style={{ mixBlendMode: "multiply", width: "35rem" }}
            />
          </Stack>
        </Hidden>
      </Grid>

      <Grid item lg={5} justifyContent="center" container>
        <Container>
          <FormContainer
            defaultValues={{}}
            onSuccess={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <Box justifyContent="center" alignSelf="center">
              <Stack
                spacing={5}
                justifyContent="center"
                sx={{
                  height: "100vh",

                  maxWidth: "25rem",

                  marginLeft: "auto",

                  marginRight: "auto",
                }}
              >
                <Stack alignItems="center">
                  <img
                    src="/images/MicrosoftTeams.png"
                    alt="Login hero"
                    width={70}
                    height={70}
                    style={{ justifyContent: "center" }}
                  />
                </Stack>

                <Stack spacing={2}>
                  <Typography variant="h4">Welcome</Typography>

                  <Typography variant="h5">Login</Typography>

                  <Stack spacing={1}>
                    <label>Username</label>

                    <TextFieldElement
                      fullWidth
                      name="username"
                      required
                      size="small"
                      placeholder="Username"
                    />
                  </Stack>

                  <Stack spacing={1}>
                    <label>Password</label>

                    <TextFieldElement
                      type="password"
                      fullWidth
                      name="password"
                      size="small"
                      required
                      placeholder="Password"
                    />
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row">
                      <Checkbox />

                      <Stack alignSelf="center">
                        <label>Remember Me</label>
                      </Stack>
                    </Stack>

                    <Stack alignSelf="center">
                      <Link color="inherit">Forgot Password</Link>
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    <Button type="submit" variant="contained" fullWidth>
                      Proceed
                    </Button>

                    <Stack alignItems="end">
                      <Link color="inherit">Need Help?</Link>
                    </Stack>
                  </Stack>

                  <Stack justifyContent="center" direction="row" spacing={1}>
                    <Typography>OR</Typography>
                  </Stack>
                  <Stack>
                    <Button
                      type="button"
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        navigate("/otp-login");
                      }}
                    >
                      Login with Otp
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </FormContainer>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
