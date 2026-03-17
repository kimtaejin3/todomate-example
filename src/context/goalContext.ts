import { createContext } from "react";
import type { Goal } from "../types";

export interface GoalContextValue {
  goals: Goal[];
  addGoal: (name: string, color: string) => void;
  updateGoal: (id: number, name: string) => void;
  deleteGoal: (id: number) => void;
}

export const GoalContext = createContext<GoalContextValue | null>(null);
