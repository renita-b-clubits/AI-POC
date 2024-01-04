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

export const defaultKey = "username";

export const usernameSchema = z.object({
  username: z
    .string({ required_error: `${capitalCase(defaultKey)} is required.` })
    .min(1, `${capitalCase(defaultKey)} should contain at least 1 character.`),
});

export type UsernameSchema = z.infer<typeof usernameSchema>;

export type UsernameProps = InputProps & {
  name?: string;
  help?: React.ReactNode;
};

export const Username = (props: UsernameProps) => {
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

export default Username;
