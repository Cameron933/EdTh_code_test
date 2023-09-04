import React from "react";
import {
  FormControl,
  FormLabel,
  Input as CKInput,
  InputProps as CKInputProps,
  InputGroup,
  InputRightElement,
  Icon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

type GroupInputProps = {
  label: string;
  id: string;
  placeholder: string;
  isInvalid: boolean;
  role?: string;
  type?: string;
} & CKInputProps;
export const FormGroupInput = React.forwardRef(function FormGroupInput(
  { id, label, isInvalid, ...inputProps }: GroupInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <FormControl variant="floating" id={id} isInvalid={isInvalid}>
      <InputGroup my="1rem">
        <CKInput {...inputProps} ref={ref} />
        <FormLabel htmlFor={label}>{label}</FormLabel>
        <InputRightElement pointerEvents="none">
          <Icon as={FaEdit} color="blue.400" />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{`${label} cannot be empty`}</FormErrorMessage>
    </FormControl>
  );
});
