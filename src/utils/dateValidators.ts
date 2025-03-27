const validateDate = (value: string): { isValid: boolean; message?: string } => {
  const trimmedValue = value.trim().replace(/\s+/g, "");
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;

  if (!dateRegex.test(trimmedValue)) {
    return {
      isValid: false,
      message: "Invalid format. Use YYYY-MM-DD (e.g., 1990-05-15)",
    };
  }

  const [, year, month, day] = dateRegex.exec(trimmedValue)!;
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  const currentYear = new Date().getFullYear();

  if (monthNum < 1 || monthNum > 12) {
    return {
      isValid: false,
      message: `Invalid month (${month}). Month must be between 01 and 12`,
    };
  }

  const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
  if (dayNum < 1 || dayNum > daysInMonth) {
    return {
      isValid: false,
      message: `Invalid day (${day}) for ${month}/${year}. Month ${month} has ${daysInMonth} days`,
    };
  }

  if (yearNum > currentYear) {
    return {
      isValid: false,
      message: `Invalid year (${year}). Year cannot be in the future`,
    };
  }

  return { isValid: true };
};

export default validateDate;
