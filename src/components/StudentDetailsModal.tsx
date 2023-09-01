import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

type StudentTableProps = {
  student: StudentInfo | null;
  profileImage: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveEdit: (editedStudentInfo: StudentInfo) => void;
};

const StudentDetailsModal = ({
  student,
  profileImage,
  isOpen,
  onClose,
  onSaveEdit,
}: StudentTableProps) => {
  const [studentFirstName, setStudentFirstName] = useState<string>(student?.first_name || "");
  const [studentLastName, setStudentLastName] = useState<string>(student?.last_name || "");

  const handleSaveClick = () => {
    if (student) {
      const editedStudentInfo: StudentInfo = {
        ...student,
        first_name: studentFirstName,
        last_name: studentLastName,
      };
      onSaveEdit(editedStudentInfo);

      console.log(editedStudentInfo);
    }
  };
  console.log({ student, studentFirstName, studentLastName });

  return (
    student && (
      <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior={"inside"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{student ? `${student.first_name} ${student.last_name}` : ""}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {student && profileImage ? (
                <>
                  <img
                    src={profileImage}
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
              <Button onClick={handleSaveClick}>Save</Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  );
};

export default StudentDetailsModal;
