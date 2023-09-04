import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React from "react";

type FormProps = {
  formLabel: string;
  errorMessage?: string;
  children: React.ReactNode;
};
export function Form({ formLabel, errorMessage, children }: FormProps) {
  return (
    <FormControl as="form" isInvalid={errorMessage !== undefined}>
      <FormLabel>{formLabel}</FormLabel>
      {children}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
