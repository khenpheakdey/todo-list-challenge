"use server";

import { db } from "@/lib/configs/firebase-config";
import { TODO_COLLECTION } from "@/lib/constants";
import { Todo } from "@/types/todo";
import { convertTimestampToDate, getCurrentDate } from "@/utils/date-time";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

const createTodo = async (todo: Todo) => {
  const collectionRef = collection(db, TODO_COLLECTION);

  // Add a new document with a generated id.
  await addDoc(collectionRef, {
    todo: todo.todo,
    isCompleted: todo.isCompleted,
    createdAt: getCurrentDate(),
  });
};

// Get all documents in the todos collection
const getTodos = async () => {
  const querySnapshot = await getDocs(collection(db, TODO_COLLECTION));
  const todos: Todo[] = [];

  querySnapshot.forEach((doc) => {
    todos.push({
      id: doc.id,
      todo: doc.data().todo,
      isCompleted: doc.data().isCompleted,
      createdAt: convertTimestampToDate(doc.data().createdAt),
    } as Todo);
  });

  revalidatePath("/");

  return todos;
};

const updateTodo = async (todoId: string, newTodo: Todo) => {
  const docRef = doc(db, TODO_COLLECTION, todoId);

  await updateDoc(docRef, {
    todo: newTodo.todo,
    isCompleted: newTodo.isCompleted,
  });

  revalidatePath(`/`);
};

const deleteTodo = async (todoId: string) => {
  const docRef = doc(db, TODO_COLLECTION, todoId);
  await deleteDoc(docRef);

  revalidatePath("/");
};

export { createTodo, getTodos, updateTodo, deleteTodo };
