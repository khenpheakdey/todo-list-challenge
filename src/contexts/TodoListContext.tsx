"use client";

import { Todo } from "@/types/todo";
import { createContext } from "react";

type TodoListContextType = {
  todos: Todo[];
  addTodo: (Todo: Todo) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, newTodo: string) => void;
  toggleTodo: (id: string) => void;
};

export const TodoListContext = createContext<TodoListContextType | null>(null);
