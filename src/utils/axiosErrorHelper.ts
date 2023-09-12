import { AxiosError } from "axios";
import toast from "react-hot-toast";

const axiosErrorHelper = (error: AxiosError) => {
  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 400:
        toast.error("Your request is invalid.");
        break;
      case 500:
        toast.error("Server not responding, please refresh the page and try again later.");
        break;
      default:
        toast.error("An unexpected error occurred.");
        console.log(error.status, error.message);
        break;
    }
  }
};

export default axiosErrorHelper;
