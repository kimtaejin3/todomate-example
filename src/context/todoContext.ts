import { createContext } from "react";
import type { Todo } from "../types";

export interface TodoContextValue {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (goalId: string, content: string, date: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, content: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  deleteTodosByGoalId: (goalId: string) => Promise<void>;
}

export const TodoContext = createContext<TodoContextValue | null>(null);
