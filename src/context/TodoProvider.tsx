import { useState, type ReactNode } from "react";
import type { Todo } from "../types";
import { TodoContext } from "./todoContext";

const INITIAL_TODOS: Todo[] = [
  { id: 1, goalId: 1, content: "헬스장 가기", isCompleted: false, date: "2026-03-15" },
  { id: 2, goalId: 1, content: "스트레칭", isCompleted: true, date: "2026-03-15" },
  { id: 3, goalId: 2, content: "리액트 공부", isCompleted: false, date: "2026-03-15" },
  { id: 4, goalId: 2, content: "타입스크립트 복습", isCompleted: false, date: "2026-03-16" },
];

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState(INITIAL_TODOS);

  const addTodo = (goalId: number, content: string, date: string) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), goalId, content, isCompleted: false, date },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)),
    );
  };

  const updateTodo = (id: number, content: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, content } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const deleteTodosByGoalId = (goalId: number) => {
    setTodos((prev) => prev.filter((t) => t.goalId !== goalId));
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, updateTodo, deleteTodo, deleteTodosByGoalId }}
    >
      {children}
    </TodoContext.Provider>
  );
}
