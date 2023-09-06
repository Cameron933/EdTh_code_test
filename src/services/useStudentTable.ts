import axios, { AxiosError } from "axios";
import dateFormatter from "../utils/dateTimeFomatter";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import axiosErrorHelper from "../utils/axiosErrorHelper";

type UseStudentTableReturnType = {
  studentInfo: StudentInfo[];
  isLoading: boolean;
  fetchStudentsInfo: () => Promise<void>;
};

const useStudentTable = (): UseStudentTableReturnType => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const fetchStudentsInfo = async () => {
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
  };

  useEffect(() => {
    fetchStudentsInfo();
  }, []);

  return { studentInfo, isLoading, fetchStudentsInfo };
};

export default useStudentTable;
