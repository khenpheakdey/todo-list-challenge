"use client";

import { useTodoList } from "@/hooks/use-todo-list";
import { Todo } from "@/types/todo";
import { useState } from "react";
import { createTodo } from "./actions";
import { getCurrentDate } from "@/utils/date-time";
import { Input } from "@/components/Input";
import { generateUUID } from "@/utils/uuid";

export default function Home() {
  const { todos, addTodo, removeTodo, editTodo, toggleTodo } = useTodoList();
  const [onHoverId, setOnHoverId] = useState<string | null>(null);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState<string>("");
  const [textEditing, setTextEditing] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement)
      .elements[0] as HTMLInputElement;

    // Valid Todo
    if (!input.value) {
      alert("Cannot add an empty todo!");
      return;
    }

    // There should be no duplicate item in the list
    const isDuplicated = todos.some((t) => t.todo === input.value);

    // If the todo already exists, warn the user
    if (isDuplicated) {
      alert("This todo already exists!");
      return;
    }

    try {
      // Form data
      const newTodo: Todo = {
        id: generateUUID(),
        todo: input.value,
        isCompleted: false,
        createdAt: getCurrentDate(),
      };

      await createTodo(newTodo);
      input.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (textEditing === event.target.defaultValue && textEditing === "")
      return event.target.defaultValue;
    setTextEditing(event.target.value);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value.trim());
  };

  const handleEdit = async (todoId: string, newTodoText: string | null) => {
    if (!newTodoText) {
      alert("Cannot update an empty todo!");
      return;
    }

    try {
      await editTodo(todoId, newTodoText);

      setIsEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEditMode = (todoId: string) => {
    setIsEditingId((prevId) => (prevId === todoId ? null : todoId));
    setTextEditing(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isEditingId) {
      event.preventDefault(); // Prevent form submission
      handleEdit(isEditingId, textEditing);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmit} className="space-y-2">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <div className="flex gap-x-2">
          <Input type="text" placeholder="Add a new Todo" />
          <button type="submit">Add Todo</button>
        </div>

        <Input
          type="text"
          placeholder="Filter Todos"
          value={filterText}
          onChange={handleFilter}
        />
        <ul>
          {todos
            .filter((todo) =>
              todo.todo.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((todo) => (
              <li
                key={todo.id}
                className="w-full flex items-center space-x-2"
                onMouseEnter={() => setOnHoverId(todo.id)}
                onMouseLeave={() => setOnHoverId(todo.id)}
              >
                {isEditingId === todo.id ? (
                  <Input
                    type="text"
                    defaultValue={todo.todo}
                    value={textEditing ?? todo.todo}
                    onChange={handleOnEditing}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  <span className={todo.isCompleted ? "line-through" : ""}>
                    {todo.todo}
                  </span>
                )}
                {onHoverId === todo.id && (
                  <div className="flex gap-x-2">
                    {
                      // Mark the todo as completed or incompleted
                      todo.isCompleted ? (
                        <button
                          type="button"
                          onClick={() => toggleTodo(todo.id)}
                        >
                          Incomplete
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleTodo(todo.id)}
                        >
                          Complete
                        </button>
                      )
                    }
                    {
                      // If the todo is being edited, show the save button
                      isEditingId === todo.id ? (
                        <button
                          type="button"
                          onClick={() => handleEdit(todo.id, textEditing)}
                        >
                          Save
                        </button>
                      ) : null
                    }
                    <button
                      type="button"
                      className="p-2"
                      onClick={() => toggleEditMode(todo.id)}
                    >
                      {isEditingId === todo.id ? "Cancel" : "Edit"}
                    </button>
                    <button type="button" onClick={() => removeTodo(todo.id)}>
                      Remove
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </form>
    </main>
  );
}
