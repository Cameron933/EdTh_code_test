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
  useToast,
} from "@chakra-ui/react";
import StudentDetailsModal from "./StudentDetailsModal";
import StudentTableRow from "./StudentTableRow";
import LoadingTable from "./LoadingTable";
import { useStudentInfoStore } from "../hooks/useStudentInfoStore";
import { AxiosError } from "axios";
import axiosErrorHelper from "../utils/axiosErrorHelper";

const StudentTable = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentInfo>();
  const { studentInfo, isLoading, fetchStudentsInfo } = useStudentInfoStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleRowClick = (student: StudentInfo) => {
    setSelectedStudent(student);
    onOpen();
  };

  const handleError = (error: AxiosError) => {
    axiosErrorHelper(error, toast);
  };

  useEffect(() => {
    console.log("update");
    fetchStudentsInfo(handleError);
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

        {selectedStudent && (
          <StudentDetailsModal student={selectedStudent} isOpen={isOpen} onClose={onClose} />
        )}
      </VStack>
    </TableContainer>
  );
};

export default StudentTable;
