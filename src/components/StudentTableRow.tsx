import React from "react";
import { Tr, Td } from "@chakra-ui/react";

type StudentListProps = {
  student: StudentInfo;
  onRowClick: () => void;
};

const StudentListRow = ({ student, onRowClick }: StudentListProps) => {
  return (
    <Tr onClick={onRowClick}>
      <Td textAlign="center">{student.id}</Td>
      <Td>{`${student.first_name} ${student.last_name}`}</Td>
      <Td>{student.date_of_birth}</Td>
    </Tr>
  );
};

export default StudentListRow;
