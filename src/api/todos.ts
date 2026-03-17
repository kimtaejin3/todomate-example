import type { Todo } from "../types";

const BASE_URL = "http://localhost:3001";

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(todo: {
  goalId: string;
  content: string;
  date: string;
}): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...todo, isCompleted: false }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function patchTodo({
  id,
  ...fields
}: {
  id: string;
  content?: string;
  isCompleted?: boolean;
}): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function removeTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
}
