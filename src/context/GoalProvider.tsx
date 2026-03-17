import { useEffect, useState, type ReactNode } from "react";
import type { Goal } from "../types";
import { GoalContext } from "./goalContext";
import * as api from "../api/goals";

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.fetchGoals()
      .then(setGoals)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const addGoal = async (name: string, color: string) => {
    try {
      const newGoal = await api.createGoal(name, color);
      setGoals((prev) => [...prev, newGoal]);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const updateGoal = async (id: string, name: string) => {
    try {
      const updated = await api.patchGoal(id, name);
      setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      await api.removeGoal(id);
      setGoals((prev) => prev.filter((g) => g.id !== id));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <GoalContext.Provider value={{ goals, loading, error, addGoal, updateGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
}
