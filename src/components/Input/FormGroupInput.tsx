import React from "react";
import {
  FormControl,
  FormLabel,
  Input as CKInput,
  InputProps as CKInputProps,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  Icon,
  InputRightElement,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

type GroupInputProps = {
  label: string;
  id: string;
  placeholder: string;
  addon?: string;
  role?: string;
  type?: string;
  helperText?: string;
  errorMessage?: string;
} & CKInputProps;
export const FormGroupInput = React.forwardRef(function FormGroupInput(
  { id, isRequired, label, helperText, errorMessage, ...inputProps }: GroupInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <FormControl variant="floating" id={id} isInvalid={errorMessage !== undefined}>
      <InputGroup my="1rem">
        <CKInput {...inputProps} ref={ref} onChange={(e) => console.log(e.target.value)} />
        <FormLabel htmlFor={label}>{label}</FormLabel>
        <InputRightElement pointerEvents="none">
          {errorMessage !== undefined ? (
            <Icon as={FaEdit} color="red.400" />
          ) : (
            <Icon as={FaEdit} color="blue.400" />
          )}
        </InputRightElement>
      </InputGroup>
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage role="error">{errorMessage}</FormErrorMessage>
    </FormControl>
  );
});
