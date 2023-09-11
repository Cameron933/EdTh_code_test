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
import LoadingTable from "./LoadingTable";
import { useStudentInfoStore } from "../hooks/useStudentInfoStore";
import toast, { Toaster } from "react-hot-toast";

const StudentTable = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentInfo>();
  const { studentInfo, isLoading, fetchStudentsInfo } = useStudentInfoStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRowClick = (student: StudentInfo) => {
    setSelectedStudent(student);
    onOpen();
  };

  useEffect(() => {
    console.log("update");
    fetchStudentsInfo();
  }, []);

  if (!studentInfo) return <React.Fragment></React.Fragment>;

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
              studentInfo.map((student) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                  onRowClick={() => handleRowClick(student)}
                />
              ))
            )}
          </Tbody>
        </Table>
        <Toaster position="bottom-center" reverseOrder={false} />
        {selectedStudent && (
          <StudentDetailsModal student={selectedStudent} isOpen={isOpen} onClose={onClose} />
        )}
      </VStack>
    </TableContainer>
  );
};

export default StudentTable;
