import { useAtom } from "jotai";
import { goalsAtom } from "../store/atoms";
import * as api from "../api/goals";
import { useCallback } from "react";

export function useGoals() {
  const [goals, setGoals] = useAtom(goalsAtom);

  const addGoal = useCallback(async (name: string, color: string) => {
    const newGoal = await api.createGoal(name, color);
    setGoals([...goals, newGoal]);
  }, [goals, setGoals]);

  const updateGoal = useCallback(async (id: string, name: string) => {
    const updated = await api.patchGoal(id, { name });
    setGoals(goals.map((g) => (g.id === id ? updated : g)));
  }, [goals, setGoals]);

  const deleteGoal = useCallback(async (id: string) => {
    await api.removeGoal(id);
    setGoals(goals.filter((g) => g.id !== id));
  }, [goals, setGoals]);

  return { goals, addGoal, updateGoal, deleteGoal };
}
