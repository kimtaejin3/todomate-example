import { create } from "zustand";
import type { Goal } from "../types";
import * as api from "../api/goals";

interface GoalState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  fetchGoals: () => Promise<void>;
  addGoal: (name: string, color: string) => Promise<void>;
  updateGoal: (id: string, name: string) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  loading: false,
  error: null,

  fetchGoals: async () => {
    set({ loading: true, error: null });
    try {
      const goals = await api.fetchGoals();
      set({ goals, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  addGoal: async (name, color) => {
    try {
      const goal = await api.createGoal({ name, color });
      set((state) => ({ goals: [...state.goals, goal] }));
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  updateGoal: async (id, name) => {
    try {
      const updated = await api.patchGoal(id, { name });
      set((state) => ({
        goals: state.goals.map((g) => (g.id === id ? updated : g)),
      }));
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },

  deleteGoal: async (id) => {
    try {
      await api.removeGoal(id);
      set((state) => ({
        goals: state.goals.filter((g) => g.id !== id),
      }));
    } catch (e) {
      set({ error: (e as Error).message });
    }
  },
}));
