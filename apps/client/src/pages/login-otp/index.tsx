import { Button, Form } from "reactstrap";
import { useMutation } from "@tanstack/react-query";
import { accountLoginOtp, accountLoginVerify } from "./service";
import { useAuthContext } from "../../shared/hooks/use-auth";
import React from "react";
import PhoneNo, { phoneNumberSchema } from "./form/fields/phonenumber";
import Otp, { otpSchema } from "./form/fields/otp";
import { z } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";

export const loginSchema = phoneNumberSchema.merge(otpSchema);

export type LoginFormData = z.infer<typeof loginSchema>;

export const LoginOtp = () => {
  const auth = useAuthContext();

  const send_otp = useMutation({
    mutationKey: ["send"],
    mutationFn: accountLoginOtp,
  });

  const verify_otp = useMutation({
    mutationKey: ["verify"],
    mutationFn: accountLoginVerify,
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("handle submit called", data);
    if (!send_otp.data?.data?.status) {
      send_otp.mutate({
        phone: data.phone,
        otp: "",
      });
    } else {
      verify_otp.mutate({
        phone: data.phone,
        otp: data.otp ?? "",
      });
    }
  };

  React.useEffect(() => {
    if (!verify_otp.data) return;

    if (verify_otp.data.data) {
      auth.dispatcher({ type: "set-user", payload: verify_otp.data.data });
    } else {
      toast.error("Invalid Otp");
    }
  }, [auth, verify_otp.data]);

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <>
      <div className="vstack gap-3">
        <div>
          <h5>Login in with OTP</h5>
        </div>
        <>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <PhoneNo
                placeholder="Phone No or Email"
                disabled={send_otp.data?.data?.status}
              />
              <Otp placeholder="" disabled={!send_otp.data?.data?.status} />

              <div className="hstack justify-content-between align-items-baseline mb-3"></div>

              <Button
                type="submit"
                color="primary"
                className="text-white w-100 mt-4"
                onClick={methods.handleSubmit(onSubmit)}
              >
                {!send_otp.data?.data?.status ? "Send OTP" : "Verify OTP"}
              </Button>
            </Form>
          </FormProvider>
          <div>
            <Toaster />
          </div>
        </>
        {/* <Button color="primary" className="text-white w-100 mt-2" onClick={}>
          Log in with OTP
        </Button> */}
      </div>
    </>
  );
};

export default LoginOtp;
