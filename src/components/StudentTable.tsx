import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import DateFormatter from "../utils/DateFormatter";

const StudentTable = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([]);
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);

  const [selectedProfileImage, setSelectedProfileImage] = useState<string>("");

  const fetchStudentsInfo = async () => {
    try {
      const responseStudents = await axios.get("http://localhost:5000/students");
      const responseProfiles = await axios.get("http://localhost:5000/profiles");

      if (responseStudents && responseStudents.data) {
        const dobFormattedStudentsInfo = responseStudents.data.map((student: StudentInfo) => ({
          ...student,
          date_of_birth: DateFormatter(student.date_of_birth),
        }));
        setStudentInfo(dobFormattedStudentsInfo);
      }

      if (responseProfiles && responseProfiles.data) {
        setStudentProfiles(responseProfiles.data);
      }
    } catch (error) {
      const { response, message } = error as AxiosError;
      console.log(message);
      console.log(response?.status);
    }
  };

  useEffect(() => {
    fetchStudentsInfo();
  }, []);

  console.log(studentInfo, studentProfiles);

  return (
    <TableContainer>
      <Table variant="simple" color="white">
        <TableCaption>View and update student details by clicking the row</TableCaption>
        <Thead>
          <Tr>
            <Th>Student No</Th>
            <Th>Full Name</Th>
            <Th>Date of Birth</Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentInfo.map((student) => {
            return (
              <React.Fragment key={student.id}>
                <Tr>
                  <Td textAlign="center">{student.id}</Td>
                  <Td>{`${student.first_name} ${student.last_name}`}</Td>
                  <Td>{student.date_of_birth}</Td>
                </Tr>
              </React.Fragment>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
