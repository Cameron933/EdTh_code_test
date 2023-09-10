import { create } from "zustand";
import dateFormatter from "../utils/dateTimeFomatter";
import axios, { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";

type UseStudentContextType = {
  studentInfo: StudentInfo[];
  isLoading: boolean;
  fetchStudentsInfo: (handleError: (error: AxiosError) => void) => Promise<void>;
};

export const useStudentInfoStore = create<UseStudentContextType>((set) => ({
  isLoading: false,
  studentInfo: [],
  fetchStudentsInfo: async (errorHandler) => {
    set(() => ({
      isLoading: true,
    }));
    try {
      const response = await axios.get(`${process.env.REACT_APP_STUDENT_TABLE_DATA}`);
      const dobFormattedStudentsInfo = response.data.map((student: StudentInfo) => ({
        ...student,
        date_of_birth: dateFormatter(student.date_of_birth),
      }));
      console.log("fetching");
      set(() => ({ studentInfo: dobFormattedStudentsInfo }));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error instanceof AxiosError) {
          errorHandler(error);
        }
      }
    } finally {
      set(() => ({
        isLoading: false,
      }));
    }
  },
}));

const useStudentInfo = () => {
  const toast = useToast();
};
