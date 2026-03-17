import type { Goal } from "../types";

const BASE_URL = "http://localhost:3001";

export async function fetchGoals(): Promise<Goal[]> {
  const res = await fetch(`${BASE_URL}/goals`);
  if (!res.ok) throw new Error("Failed to fetch goals");
  return res.json();
}

export async function createGoal(goal: { name: string; color: string }): Promise<Goal> {
  const res = await fetch(`${BASE_URL}/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error("Failed to create goal");
  return res.json();
}

export async function patchGoal({ id, name }: { id: string; name: string }): Promise<Goal> {
  const res = await fetch(`${BASE_URL}/goals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to update goal");
  return res.json();
}

export async function removeGoal(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/goals/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete goal");
}
