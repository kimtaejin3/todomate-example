import { createContext } from "react";
import type { Goal } from "../types";

export interface GoalContextValue {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  addGoal: (name: string, color: string) => Promise<void>;
  updateGoal: (id: string, name: string) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

export const GoalContext = createContext<GoalContextValue | null>(null);
