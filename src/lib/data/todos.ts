import { Todo } from "@/types/todo";
import { getCurrentDate } from "@/utils/date-time";

// Dummy data
export const todos: Todo[] = [
  {
    id: "1",
    todo: "Finish homework",
    isCompleted: false,
    createdAt: getCurrentDate(),
  },
  {
    id: "2",
    todo: "Go grocery shopping",
    isCompleted: false,
    createdAt: getCurrentDate(),
  },
];
