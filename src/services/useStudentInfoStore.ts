import { create } from "zustand";
import dateFormatter from "../utils/dateTimeFomatter";
import axios, { AxiosError } from "axios";
import axiosErrorHelper from "../utils/axiosErrorHelper";
import toast from "react-hot-toast";

type UseStudentContextType = {
  studentInfo: StudentInfo[];
  isLoading: boolean;
  fetchStudentsInfo: () => Promise<void>;
};

export const useStudentInfoStore = create<UseStudentContextType>((set) => ({
  isLoading: false,
  studentInfo: [],
  fetchStudentsInfo: async () => {
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
        axiosErrorHelper(error);
      }
    } finally {
      set(() => ({
        isLoading: false,
      }));
    }
  },
}));
