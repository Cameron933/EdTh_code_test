import * as yup from "yup";

export const StudentInfoFormSchema = yup
  .object({
    firstName: yup
      .string()
      .required("The first name is required")
      .min(1, "First name must contain at least 1 character(s)"),
    lastName: yup
      .string()
      .required("The last name is required")
      .min(1, "Last name must contain at least 1 character(s)"),
  })
  .required();
