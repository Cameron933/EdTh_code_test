import React, { useState, useCallback } from "react";
import axiosErrorHelper from "../utils/axiosErrorHelper";
import axios, { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";
import dateFormatter from "../utils/dateTimeFomatter";
import { StudentContext } from "./StudentContext";

const StudentContextProvider = ({ children }: any) => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const fetchStudentsInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_STUDENT_TABLE_DATA}`);
      const dobFormattedStudentsInfo = response.data.map((student: StudentInfo) => ({
        ...student,
        date_of_birth: dateFormatter(student.date_of_birth),
      }));
      console.log("fetching");
      setStudentInfo(dobFormattedStudentsInfo);
    } catch (error) {
      if (error instanceof AxiosError) {
        axiosErrorHelper(error, toast);
      }
    } finally {
      setIsLoading(false);
    }
  }, [studentInfo]);

  return (
    <StudentContext.Provider value={{ studentInfo, isLoading, fetchStudentsInfo }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
