import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchGoals, createGoal, patchGoal, removeGoal } from "../api/goals";
import { fetchTodos, removeTodo } from "../api/todos";

export function useGoalsQuery() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });
}

export function useAddGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // First, fetch all todos with this goalId and delete them
      const todos = await fetchTodos();
      const goalTodos = todos.filter((t) => t.goalId === id);
      await Promise.all(goalTodos.map((t) => removeTodo(t.id)));
      // Then delete the goal itself
      await removeGoal(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
