import { Todo } from "@/types/todo";
import { getCurrentDate } from "@/utils/date-time";

// Dummy data
export const todos: Todo[] = [
  {
    id: "1",
    todo: "Do assignment",
    isCompleted: false,
    createdAt: getCurrentDate(),
  },
  {
    id: "2",
    todo: "Shopping",
    isCompleted: false,
    createdAt: getCurrentDate(),
  },
];
