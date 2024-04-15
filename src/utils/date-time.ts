import { Timestamp } from "firebase/firestore";

const getRandomTimestamp = (): Timestamp => {
  const startTimestamp: number = new Date("2024-01-01").getTime();
  const endTimestamp: number = new Date().getTime();
  const randomTimestamp: number = Math.floor(
    Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp
  );
  const randomDate: Date = new Date(randomTimestamp);

  return Timestamp.fromDate(randomDate);
};

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

export {
  getRandomTimestamp,
  getCurrentTimestamp,
  getCurrentDate,
  convertTimestampToDate,
};
