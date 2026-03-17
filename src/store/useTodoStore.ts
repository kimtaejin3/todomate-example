import { create } from "zustand";
import type { Todo } from "../types";
import * as api from "../api/todos";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (goalId: string, content: string, date: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, content: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  deleteTodosByGoalId: (goalId: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const todos = await api.fetchTodos();
      set({ todos, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  addTodo: async (goalId, content, date) => {
    try {
      const todo = await api.createTodo({
        goalId,
        content,
        isCompleted: false,
        date,
      });
      set((state) => ({ todos: [...state.todos, todo] }));
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  toggleTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const updated = await api.patchTodo(id, {
        isCompleted: !todo.isCompleted,
      });
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updated : t)),
      }));
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  updateTodo: async (id, content) => {
    try {
      const updated = await api.patchTodo(id, { content });
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updated : t)),
      }));
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  deleteTodo: async (id) => {
    try {
      await api.removeTodo(id);
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  deleteTodosByGoalId: async (goalId) => {
    const todosToDelete = get().todos.filter((t) => t.goalId === goalId);
    try {
      await Promise.all(todosToDelete.map((t) => api.removeTodo(t.id)));
      set((state) => ({
        todos: state.todos.filter((t) => t.goalId !== goalId),
      }));
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },
}));
