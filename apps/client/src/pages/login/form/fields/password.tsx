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

export const defaultKey = "password";

export const passwordSchema = z.object({
  password: z
    .string({ required_error: `${capitalCase(defaultKey)} is required.` })
    .min(1, `${capitalCase(defaultKey)} should contain at least 1 character.`),
});

export type PasswordSchema = z.infer<typeof passwordSchema>;

export type PasswordProps = InputProps & {
  help?: React.ReactNode;
};

export const Password = (props: PasswordProps) => {
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
              type="password"
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

export default Password;
