"use client";

import { useContext } from "react";
import { TodoListContext } from "@/contexts/TodoListContext";

export function useTodoList() {
  const context = useContext(TodoListContext);

  if (!context) {
    throw new Error("useTodoList must be used within a TodoListProvider");
  }

  return context;
}
