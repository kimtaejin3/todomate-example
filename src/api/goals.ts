import type { Goal } from "../types";

const BASE_URL = "http://localhost:3001/goals";

export async function fetchGoals(): Promise<Goal[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch goals");
  return res.json();
}

export async function createGoal(
  name: string,
  color: string,
): Promise<Goal> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  if (!res.ok) throw new Error("Failed to create goal");
  return res.json();
}

export async function patchGoal(
  id: string,
  data: Partial<Goal>,
): Promise<Goal> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to patch goal");
  return res.json();
}

export async function removeGoal(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete goal");
}
