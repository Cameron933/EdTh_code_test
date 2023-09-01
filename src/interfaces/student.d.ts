interface StudentInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  address: Address;
}

interface Address {
  street_line1: string;
  street_line2: string;
  country: string;
  postcode: string;
  suburb?: string;
}
