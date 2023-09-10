import axios, { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import axiosErrorHelper from "../utils/axiosErrorHelper";
import { useStudentInfoStore } from "./useStudentInfoStore";

type UseStudentDetailsModalReturnType = {
  isLoading: boolean;
  isUpdating: boolean;
  studentProfile?: StudentProfile;
  updateStudentPayload: (editedStudentInfo: StudentInfo) => Promise<void>;
};

const useStudentDetailsModal = (
  studentId: number | undefined
): UseStudentDetailsModalReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>();
  const toast = useToast();

  const { fetchStudentsInfo } = useStudentInfoStore();

  const handleError = (error: AxiosError) => {
    axiosErrorHelper(error, toast);
  };

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
  }, [studentId, toast]);

  const updateStudentPayload = async (editedStudentInfo: StudentInfo) => {
    try {
      setIsUpdating(true);
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

      fetchStudentsInfo(handleError);
    } catch (error) {
      if (error instanceof AxiosError) {
        axiosErrorHelper(error, toast);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchStudentProfile();
  }, [fetchStudentProfile]);

  return { isLoading, isUpdating, studentProfile, updateStudentPayload };
};

export default useStudentDetailsModal;
