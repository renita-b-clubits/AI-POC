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

export const defaultKey = "Email or Phone no";

export const phoneNumberSchema = z.object({
  phone: z
    .string({ required_error: `${capitalCase(defaultKey)} is required.` })
    .min(8, `${capitalCase(defaultKey)} should contain at least 10 character.`),
});

export type PhoneNumberSchema = z.infer<typeof phoneNumberSchema>;

export type PhoneNumberProps = InputProps & {
  name?: string;
  help?: React.ReactNode;
};

export const PhoneNo = (props: PhoneNumberProps) => {
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

export default PhoneNo;
