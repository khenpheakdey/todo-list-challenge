import { Timestamp } from "firebase/firestore";

export interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
}
