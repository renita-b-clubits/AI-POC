// [5:03 PM] Vignesh S, cluBITS
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";

import { Container, Box, Grid, Stack, Button, Hidden } from "@mui/material";

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

import React, { useState } from "react";

// import { gapi } from "gapi-script";

import { useAuthContext } from "../shared/hooks/use-auth";
import { handleTRPCError } from "../utils/handle-trpc-error";

export const LoginPage = () => {
  const [otpSent, setOtpSent] = React.useState({
    status: false,
    username: "",
  });

  const [countdown, setCountdown] = useState(0);
  const [ResendBtn, setResendBtn] = useState("send otp");
  console.log(ResendBtn);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      const new_count = countdown - 1;
      timer = setInterval(() => {
        setCountdown(new_count);
        if (new_count === 0) {
          setResendBtn("Resend otp");
          setOtpSent({
            status: false,
            username: "",
          });
        }
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  const loginValidationSchema = z
    .object({
      username: z.string().optional(),
      otp: z.string().optional(),
    })
    .refine((data) => data.username || otpSent.username, {
      message: "Username is required",
      path: ["username"],
    });

  type LoginValidationSchema = z.infer<typeof loginValidationSchema>;

  const auth = useAuthContext();

  const navigate = useNavigate();

  const sendOtpHandler = async (data: LoginValidationSchema) => {
    // 1. initial send - aws sms
    if (ResendBtn == "send otp") {
      const { user_details }: any = await client.user.signInWithMobile.mutate({
        username: data.username ?? "",
      });
      console.log("user_details", user_details);
      if (user_details) {
        setCountdown(90);
        setOtpSent({
          status: true,
          username: user_details.username,
        });
      }
    } else {
      // 1. resend - send twilio sms
      const { user_details }: any = await client.user.signInWithTwilio.mutate({
        username: data.username ?? "",
      });
      console.log("user_details", user_details);
      if (user_details) {
        setCountdown(90);
        setOtpSent({
          status: true,
          username: user_details.username,
        });
      }
    }
  };

  const onSubmit: SubmitHandler<LoginValidationSchema> = async (data) => {
    try {
      if (!otpSent.status) {
        await sendOtpHandler(data);
      } else {
        const { user, token } = await client.user.otp.mutate({
          username: otpSent.username,
          otp: data.otp,
        });
        if (token !== undefined) {
          setToken(token);

          auth.dispatcher({ type: "set-user", payload: user });

          navigate("/");
        } else {
          toast("Failed to Validate OTP");
        }
      }
    } catch (error) {
      toast("SOmething went wrong.");

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
                    <label>Phone Number / Email</label>

                    <TextFieldElement
                      fullWidth
                      name="username"
                      // required
                      size="small"
                      placeholder=""
                      value={otpSent.username}
                      disabled={otpSent.status}
                    />
                  </Stack>

                  <Stack spacing={1}>
                    <label>OTP</label>

                    <TextFieldElement
                      type="text"
                      fullWidth
                      name="otp"
                      size="small"
                      required
                      placeholder="OTP"
                      disabled={!otpSent.status}
                    />
                  </Stack>

                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                  >
                    <Button type="submit" variant="contained" fullWidth>
                      {!otpSent.status ? ResendBtn : "Verify OTP"}
                    </Button>
                    <Typography mt={2} color="primary">
                      {formatTime(countdown)}
                    </Typography>
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
