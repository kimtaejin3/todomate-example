import { useEffect, useState, type ReactNode } from "react";
import type { Todo } from "../types";
import { TodoContext } from "./todoContext";
import * as api from "../api/todos";

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.fetchTodos()
      .then(setTodos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = async (goalId: string, content: string, date: string) => {
    try {
      const newTodo = await api.createTodo(goalId, content, date);
      setTodos((prev) => [...prev, newTodo]);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const updated = await api.patchTodo(id, { isCompleted: !todo.isCompleted });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const updateTodo = async (id: string, content: string) => {
    try {
      const updated = await api.patchTodo(id, { content });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await api.removeTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const deleteTodosByGoalId = async (goalId: string) => {
    const targetTodos = todos.filter((t) => t.goalId === goalId);
    try {
      await Promise.all(targetTodos.map((t) => api.removeTodo(t.id)));
      setTodos((prev) => prev.filter((t) => t.goalId !== goalId));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, loading, error, addTodo, toggleTodo, updateTodo, deleteTodo, deleteTodosByGoalId }}
    >
      {children}
    </TodoContext.Provider>
  );
}
