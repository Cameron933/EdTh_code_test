import axios, { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import axiosErrorHelper from "../utils/axiosErrorHelper";

type UseStudentDetailsModalReturnType = {
  isLoading: boolean;
  studentProfile?: StudentProfile;
};

const useStudentDetailsModal = (
  studentId: number | undefined
): UseStudentDetailsModalReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>();
  const toast = useToast();

  const fetchStudentProfile = useCallback(async () => {
    if (!studentId) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_PROFILE_DATA}${studentId}`);
      if (response && response.data) {
        setStudentProfile(response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        axiosErrorHelper(error, toast);
      }
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchStudentProfile();
  }, [fetchStudentProfile]);

  return { isLoading, studentProfile };
};

export default useStudentDetailsModal;
