import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import DateFormatter from "../utils/DateFormatter";
import StudentDetailsModal from "./StudentDetailsModal";
import StudentTableRow from "./StudentTableRow";

const StudentTable = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([]);
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);

  const [selectedStudent, setSelectedStudent] = useState<StudentInfo | null>(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRowClick = (student: StudentInfo) => {
    const profileImage = studentProfiles.find((p) => p.student_id === student.id);
    setSelectedStudent(student);
    if (profileImage) {
      setSelectedProfileImage(profileImage.image_url);
    } else {
      setSelectedProfileImage("");
    }
    onOpen();
    // console.log(selectedProfileImage);
  };

  const handleEditSaving = async (editedStudentInfo: StudentInfo) => {
    try {
      await axios.patch(`http://localhost:5000/students/${editedStudentInfo.id}`, {
        first_name: editedStudentInfo.first_name,
        last_name: editedStudentInfo.last_name,
      });
      fetchStudentsInfo();
      onClose();
    } catch (error) {
      console.error("Error with saving the edited student information:", error);
    }
  };

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

  console.log(studentInfo);

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
          {studentInfo.map((student) => (
            <StudentTableRow
              key={student.id}
              student={student}
              onRowClick={() => handleRowClick(student)}
            />
          ))}
        </Tbody>
      </Table>
      <StudentDetailsModal
        student={selectedStudent}
        profileImage={selectedProfileImage}
        isOpen={isOpen}
        onClose={onClose}
        onSaveEdit={handleEditSaving}
      />
    </TableContainer>
  );
};

export default StudentTable;
