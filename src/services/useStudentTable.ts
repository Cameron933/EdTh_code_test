import axios, { AxiosError } from "axios";
import dateFormatter from "../utils/dateTimeFomatter";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import axiosErrorHelper from "../utils/axiosErrorHelper";

type UseStudentTableReturnType = {
  studentInfo: StudentInfo[];
  isLoading: boolean;
  updateStudentInfo: (editedStudentInfo: StudentInfo) => Promise<void>;
};

const useStudentTable = (): UseStudentTableReturnType => {
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
      setStudentInfo(dobFormattedStudentsInfo);
    } catch (error) {
      if (error instanceof AxiosError) {
        axiosErrorHelper(error, toast);
      }
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateStudentInfo = async (editedStudentInfo: StudentInfo) => {
    try {
      setIsLoading(true);
      await axios.patch(`${process.env.REACT_APP_UPDATE_TABLE_DATA}${editedStudentInfo.id}`, {
        first_name: editedStudentInfo.first_name,
        last_name: editedStudentInfo.last_name,
      });

      toast({
        title: "Update completed",
        description: "Now we will try to update all information from server again",
        status: "info",
        duration: 6000,
        position: "bottom",
        isClosable: true,
      });

      fetchStudentsInfo();
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
  }, [fetchStudentsInfo]);

  return { studentInfo, isLoading, updateStudentInfo };
};

export default useStudentTable;
