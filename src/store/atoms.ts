import { atom } from "jotai";
import type { Goal, Todo } from "../types";
import * as goalsApi from "../api/goals";
import * as todosApi from "../api/todos";

const goalsBaseAtom = atom<Goal[] | null>(null);
const todosBaseAtom = atom<Todo[] | null>(null);

export const goalsAtom = atom(
  async (get) => {
    const cached = get(goalsBaseAtom);
    if (cached !== null) return cached;
    return await goalsApi.fetchGoals();
  },
  (_get, set, goals: Goal[]) => {
    set(goalsBaseAtom, goals);
  },
);

export const todosAtom = atom(
  async (get) => {
    const cached = get(todosBaseAtom);
    if (cached !== null) return cached;
    return await todosApi.fetchTodos();
  },
  (_get, set, todos: Todo[]) => {
    set(todosBaseAtom, todos);
  },
);
