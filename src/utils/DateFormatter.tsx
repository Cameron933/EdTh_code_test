const DateFormatter = (dob: string): string => {
  const [year, month, day] = dob.split("-");
  return `${day}/${month}/${year}`;
};

export default DateFormatter;
