import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

const StudentTable = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([]);

  const fetchStudentsInfo = async () => {
    try {
      const responseStudents = await axios.get("http://localhost:5000/students");

      if (responseStudents && responseStudents.data) {
        setStudentInfo(responseStudents.data);
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

  return <div>Student Table place holder</div>;
};

export default StudentTable;
