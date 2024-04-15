import { Timestamp } from "firebase/firestore";

// Get the current timestamp in my current timezone
const getCurrentTimestamp = (): Timestamp => {
  const currentTimestamp: number = new Date().getTime();

  const currentDate: Date = new Date(currentTimestamp);

  return Timestamp.fromDate(currentDate);
};

const getCurrentDate = (): Date => {
  const currentTimestamp: number = new Date().getTime();

  const currentDate: Date = new Date(currentTimestamp);

  return currentDate;
};

const convertTimestampToDate = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};

export { getCurrentTimestamp, getCurrentDate, convertTimestampToDate };
