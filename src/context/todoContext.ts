import { createContext } from "react";
import type { Todo } from "../types";

export interface TodoContextValue {
  todos: Todo[];
  addTodo: (goalId: number, content: string, date: string) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, content: string) => void;
  deleteTodo: (id: number) => void;
  deleteTodosByGoalId: (goalId: number) => void;
}

export const TodoContext = createContext<TodoContextValue | null>(null);
