import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Flex,
  Image,
  Text,
  VStack,
  StackDivider,
  FormControl,
} from "@chakra-ui/react";
import useStudentDetailsModal from "../services/useStudentDetailsModal";
import LoadingModal from "./LoadingModal";
import { FormGroupInput } from "./Input/FormGroupInput";
import { StudentInfoFormSchema } from "./StudentInfoForm.schema";
import { BeatLoader } from "react-spinners";

type StudentDetailsModalProps = {
  student?: StudentInfo;
  isOpen: boolean;
  onClose: () => void;
};

const StudentDetailsModal = ({ student, isOpen, onClose }: StudentDetailsModalProps) => {
  const { firstName, lastName } = formConfig;
  const { isLoading, isUpdating, studentProfile, updateStudentPayload } = useStudentDetailsModal(
    student?.id
  );
  const { register, formState, handleSubmit, reset, watch } = useForm<StudentInfoFormData>({
    defaultValues: {
      firstName: student?.first_name,
      lastName: student?.last_name,
    },
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(StudentInfoFormSchema),
  });

  const onSubmit = handleSubmit((formData) => {
    if (student) {
      const editedStudentInfo: StudentInfo = {
        ...student,
        first_name: formData.firstName,
        last_name: formData.lastName,
      };
      updateStudentPayload(editedStudentInfo);
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        firstName: student?.first_name,
        lastName: student?.last_name,
      });
    }
  }, [isOpen, student, reset]);

  if (isLoading) return <LoadingModal isLoading={isLoading} />;

  if (!student) return <React.Fragment></React.Fragment>;

  return (
    <React.Fragment>
      <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {student ? `${student.first_name} ${student.last_name}'s profile` : ""}
          </ModalHeader>
          <ModalCloseButton />
          <FormControl as="form" onSubmit={onSubmit}>
            <ModalBody>
              {studentProfile ? (
                <VStack spacing="0.5rem" w="100%">
                  <Flex>
                    <Image
                      boxSize="150px"
                      src={studentProfile.image_url}
                      alt={`student pic of ${student.first_name} ${student.last_name}`}
                    />
                  </Flex>
                  <FormGroupInput
                    {...firstName}
                    {...register("firstName")}
                    errorMessage={formState.errors.firstName?.message}
                  />
                  <FormGroupInput
                    {...lastName}
                    {...register("lastName")}
                    errorMessage={formState.errors.lastName?.message}
                  />

                  <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing="0.5rem"
                    align="stretch"
                    w="100%"
                  >
                    <Text>Date of Birth: {student.date_of_birth}</Text>
                    <Text>Street line 1: {student.address.street_line1}</Text>
                    <Text>Street line 2: {student.address.street_line2}</Text>
                    <Text>Country: {student.address.country}</Text>
                    <Text>Postcode: {student.address.postcode}</Text>
                  </VStack>
                </VStack>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Stack spacing={4} direction="row" align="center">
                <Button
                  type="submit"
                  isLoading={isUpdating}
                  spinner={<BeatLoader size={8} color="white" />}
                  loadingText="Saving"
                  disabled={!formState.isValid}
                  colorScheme="teal"
                  aria-label="saveBtn"
                >
                  Save
                </Button>
                <Button onClick={onClose} aria-label="closeBtn">
                  Close
                </Button>
              </Stack>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default StudentDetailsModal;
