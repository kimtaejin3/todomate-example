import type { Todo } from "../types";

const BASE_URL = "http://localhost:3001/todos";

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(
  goalId: string,
  content: string,
  date: string,
): Promise<Todo> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goalId, content, isCompleted: false, date }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function patchTodo(
  id: string,
  data: Partial<Todo>,
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function removeTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
}
