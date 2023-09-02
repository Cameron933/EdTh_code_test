import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import useStudentDetailsModal from "../services/useStudentDetailsModal";
import LoadingModal from "./LoadingModal";

type StudentTableProps = {
  student?: StudentInfo;
  isOpen: boolean;
  onClose: () => void;
  onSaveEdit: (editedStudentInfo: StudentInfo) => void;
};

const StudentDetailsModal = ({ student, isOpen, onClose, onSaveEdit }: StudentTableProps) => {
  const [studentFirstName, setStudentFirstName] = useState<string>(student?.first_name || "");
  const [studentLastName, setStudentLastName] = useState<string>(student?.last_name || "");
  const { isLoading, studentProfile } = useStudentDetailsModal(student?.id);

  const handleSaveClick = () => {
    if (student) {
      const editedStudentInfo: StudentInfo = {
        ...student,
        first_name: studentFirstName,
        last_name: studentLastName,
      };
      onSaveEdit(editedStudentInfo);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && student) {
      setStudentFirstName(student.first_name);
      setStudentLastName(student.last_name);
    }
  }, [isOpen, student]);

  return isLoading ? (
    <LoadingModal isLoading={isLoading} />
  ) : student ? (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {student ? `${student.first_name} ${student.last_name}'s profile` : ""}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {student && studentProfile ? (
              <>
                <img
                  src={studentProfile.image_url}
                  alt={`student pic of ${student.first_name} ${student.last_name}`}
                />
                <input
                  value={studentFirstName}
                  onChange={(e) => setStudentFirstName(e.target.value)}
                />
                <input
                  value={studentLastName}
                  onChange={(e) => setStudentLastName(e.target.value)}
                />
                <p>Date of Birth: {student.date_of_birth}</p>
                <p>Street line 1: {student.address.street_line1}</p>
                <p>Street line 2: {student.address.street_line2}</p>
                <p>Country: {student.address.country}</p>
                <p>Postcode: {student.address.postcode}</p>
              </>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Stack spacing={4} direction="row" align="center">
              <Button onClick={handleSaveClick} colorScheme="teal">
                Save
              </Button>
              <Button onClick={onClose}>Close</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  ) : null;
};

export default StudentDetailsModal;
