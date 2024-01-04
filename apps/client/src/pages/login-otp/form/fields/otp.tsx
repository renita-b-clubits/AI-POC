import React from "react";
import { z } from "zod";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  InputProps,
} from "reactstrap";
import { capitalCase } from "change-case";

export const defaultKey = "otp";

export const otpSchema = z.object({
  otp: z.string().optional(),
  // .min(4, `${capitalCase(defaultKey)} should contain at 4 character.`),
});

export type OtpSchema = z.infer<typeof otpSchema>;

export type OtpProps = InputProps & {
  help?: React.ReactNode;
};

export const Otp = (props: OtpProps) => {
  const { control } = useFormContext();

  return (
    <FormGroup>
      <Label for={defaultKey}>
        {props.required ? <span className="text-danger">*&nbsp;</span> : null}
        {capitalCase(defaultKey)}
      </Label>
      <Controller
        name={props.name || defaultKey}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              id={defaultKey}
              type="text"
              invalid={Boolean(fieldState.error?.message)}
              {...props}
            />
            {fieldState.error?.message ? (
              <FormFeedback>{fieldState.error.message}</FormFeedback>
            ) : null}
            {props.help ? <FormText>{props.help}</FormText> : null}
          </>
        )}
      />
    </FormGroup>
  );
};

export default Otp;
