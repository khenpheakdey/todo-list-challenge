"use client";

import { deleteTodo, updateTodo } from "@/app/actions";
import { TodoListContext } from "@/contexts/TodoListContext";
import { db } from "@/lib/configs/firebase-config";
import { TODO_COLLECTION } from "@/lib/constants";
import { Todo } from "@/types/todo";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

export default function TodoListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Add a new todo item
  const addTodo = (newTodo: Todo) => {
    // Check if the todo item is duplicated
    const isDuplicated = todos.some((todo) => todo.todo === newTodo.todo);

    // If the todo is not duplicated
    // Add the new todo item
    if (!isDuplicated) {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  // Remove the todo item
  const removeTodo = async (id: string) => {
    const isExisted = todos.some((todo) => todo.id === id);

    // If id is invalid, return
    if (!isExisted) {
      return;
    }

    // If id is valid, remove the todo item
    try {
      await deleteTodo(id);

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {}
  };

  // Update the todo item
  const editTodo = async (id: string, newTodo: string) => {
    try {
      await updateTodo(id, newTodo);

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, todo: newTodo } : todo
        )
      );
    } catch (error) {}
  };

  // Toggle the todo item for completion or incompletion
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // Ultilize useMemo to avoid re-rendering
  const value = useMemo(
    () => ({ todos, addTodo, editTodo, removeTodo, toggleTodo }),
    [todos]
  );

  // Get all realtime todos from the database with onSnapshot subscription method
  useEffect(() => {
    (async () => {
      const collectionRef = collection(db, TODO_COLLECTION);

      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        const list = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            todo: doc.data().todo,
            isCompleted: doc.data().isCompleted,
            createdAt: doc.data().createdAt,
          } as Todo;
        });

        setTodos(list);
      });

      return () => unsubscribe();
    })();
  }, []);

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
}
