"use server";

import { db } from "@/lib/configs/firebase-config";
import { TODO_COLLECTION } from "@/lib/constants";
import { Todo } from "@/types/todo";
import { getRandomTimestamp, convertTimestampToDate } from "@/utils/date-time";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

const createTodo = async (todo: Todo) => {
  const collectionRef = collection(db, TODO_COLLECTION);

  // Add a new document with a generated id.
  await addDoc(collectionRef, {
    todo: todo.todo,
    isCompleted: todo.isCompleted,
    createdAt: getRandomTimestamp(),
  });
};

// Get all documents in the todos collection
const getTodos = async () => {
  const querySnapshot = await getDocs(collection(db, TODO_COLLECTION));
  const todos: Todo[] = [];

  querySnapshot.forEach((doc) => {
    console.log(doc.data());
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

const updateTodo = async (todoId: string, newTodo: string) => {
  const docRef = doc(db, TODO_COLLECTION, todoId);

  await updateDoc(docRef, {
    todo: newTodo,
  });

  revalidatePath(`/`);
};

const deleteTodo = async (todoId: string) => {
  const docRef = doc(db, TODO_COLLECTION, todoId);
  await deleteDoc(docRef);

  revalidatePath("/");
};

export { createTodo, getTodos, updateTodo, deleteTodo };
