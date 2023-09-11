import axios, { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import axiosErrorHelper from "../utils/axiosErrorHelper";
import { useStudentInfoStore } from "./useStudentInfoStore";
import toast from "react-hot-toast";

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

  const { fetchStudentsInfo } = useStudentInfoStore();

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
        axiosErrorHelper(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  const updateStudentPayload = async (editedStudentInfo: StudentInfo) => {
    try {
      setIsUpdating(true);
      await axios.patch(`${process.env.REACT_APP_UPDATE_TABLE_DATA}${editedStudentInfo.id}`, {
        first_name: editedStudentInfo.first_name,
        last_name: editedStudentInfo.last_name,
      });
      fetchStudentsInfo();
    } catch (error) {
      if (error instanceof AxiosError) {
        axiosErrorHelper(error);
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
