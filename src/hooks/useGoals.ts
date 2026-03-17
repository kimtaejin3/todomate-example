import { useContext } from "react";
import { GoalContext } from "../context/goalContext";

export function useGoals() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalProvider");
  }
  return context;
}
