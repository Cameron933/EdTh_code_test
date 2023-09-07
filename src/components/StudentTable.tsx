import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import StudentDetailsModal from "./StudentDetailsModal";
import StudentTableRow from "./StudentTableRow";
import useStudentTable from "../services/useStudentTable";
import LoadingTable from "./LoadingTable";

const StudentTable = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentInfo>();
  const [studentArray, setStudentArray] = useState<StudentInfo[]>();
  const { studentInfo, isLoading } = useStudentTable();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRowClick = (student: StudentInfo) => {
    setSelectedStudent(student);
    onOpen();
  };

  useEffect(() => {
    console.log("update");
    if (studentInfo) {
      setStudentArray(studentInfo);
    }
  }, [studentInfo]);
  if (!studentArray) return <React.Fragment></React.Fragment>;
  return (
    <TableContainer>
      <VStack>
        <Table variant="simple" color="white">
          <TableCaption textColor="whiteAlpha.900">
            View and update student details by clicking the row
          </TableCaption>
          <Thead bg="white">
            <Tr>
              <Th>Student No</Th>
              <Th>Full Name</Th>
              <Th>Date of Birth</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <LoadingTable />
            ) : (
              studentArray.map((student) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                  onRowClick={() => handleRowClick(student)}
                />
              ))
            )}
          </Tbody>
        </Table>

        {selectedStudent && (
          <StudentDetailsModal student={selectedStudent} isOpen={isOpen} onClose={onClose} />
        )}
      </VStack>
    </TableContainer>
  );
};

export default StudentTable;
