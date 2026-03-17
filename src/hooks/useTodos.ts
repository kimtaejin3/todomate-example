import { useAtom } from "jotai";
import { todosAtom } from "../store/atoms";
import * as api from "../api/todos";
import { useCallback } from "react";

export function useTodos() {
  const [todos, setTodos] = useAtom(todosAtom);

  const addTodo = useCallback(async (goalId: string, content: string, date: string) => {
    const newTodo = await api.createTodo({ goalId, content, isCompleted: false, date });
    setTodos([...todos, newTodo]);
  }, [todos, setTodos]);

  const toggleTodo = useCallback(async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updated = await api.patchTodo(id, { isCompleted: !todo.isCompleted });
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  }, [todos, setTodos]);

  const updateTodo = useCallback(async (id: string, content: string) => {
    const updated = await api.patchTodo(id, { content });
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  }, [todos, setTodos]);

  const deleteTodo = useCallback(async (id: string) => {
    await api.removeTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  }, [todos, setTodos]);

  const deleteTodosByGoalId = useCallback(async (goalId: string) => {
    const targets = todos.filter((t) => t.goalId === goalId);
    await Promise.all(targets.map((t) => api.removeTodo(t.id)));
    setTodos(todos.filter((t) => t.goalId !== goalId));
  }, [todos, setTodos]);

  return { todos, addTodo, toggleTodo, updateTodo, deleteTodo, deleteTodosByGoalId };
}
