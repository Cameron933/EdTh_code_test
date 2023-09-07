import { createContext } from "react";

type UseStudentContextType = {
  studentInfo: StudentInfo[];
  isLoading: boolean;
  fetchStudentsInfo: () => Promise<void>;
};

export const StudentContext = createContext<UseStudentContextType>({
  studentInfo: [],
  isLoading: false,
  fetchStudentsInfo: async () => {},
});
