import { useState, type ReactNode } from "react";
import type { Goal } from "../types";
import { GoalContext } from "./goalContext";

const INITIAL_GOALS: Goal[] = [
  { id: 1, name: "운동", color: "#797ef6" },
  { id: 2, name: "공부", color: "#fe93b5" },
];

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState(INITIAL_GOALS);

  const addGoal = (name: string, color: string) => {
    setGoals((prev) => [...prev, { id: Date.now(), name, color }]);
  };

  const updateGoal = (id: number, name: string) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, name } : g)));
  };

  const deleteGoal = (id: number) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
}
