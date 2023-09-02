import { AxiosError } from "axios";

const axiosErrorHelper = (error: AxiosError, toast: any) => {
  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 400:
        toast({
          title: "Bad Request",
          description: "Your request is invalid",
          status: "error",
          duration: 6000,
          position: "bottom",
          isClosable: true,
        });
        break;
      case 500:
        toast({
          title: "Internal Server Error",
          description: "Server not responding, please refresh the page and try again later",
          status: "error",
          duration: 6000,
          position: "bottom",
          isClosable: true,
        });
        break;
      default:
        toast({
          title: "Other Error",
          description: "An unexpected error occurred",
          status: "error",
          duration: 6000,
          position: "bottom",
          isClosable: true,
        });
        console.log(error.status, error.message);
        break;
    }
  }
};

export default axiosErrorHelper;
