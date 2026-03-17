import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import AddGoal from "./pages/AddGoal";
import type { Goal, Todo } from "./types";
import { useState, useEffect } from "react";
import { fetchGoals, createGoal, patchGoal, removeGoal } from "./api/goals";
import {
  fetchTodos,
  createTodo,
  patchTodo,
  removeTodo,
} from "./api/todos";

function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [goalsData, todosData] = await Promise.all([
          fetchGoals(),
          fetchTodos(),
        ]);
        setGoals(goalsData);
        setTodos(todosData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addGoal = async (name: string, color: string) => {
    const newGoal = await createGoal(name, color);
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoal = async (id: string, name: string) => {
    const updated = await patchGoal(id, name);
    setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)));
  };

  const deleteGoal = async (id: string) => {
    const relatedTodos = todos.filter((t) => t.goalId === id);
    await Promise.all([
      removeGoal(id),
      ...relatedTodos.map((t) => removeTodo(t.id)),
    ]);
    setGoals((prev) => prev.filter((g) => g.id !== id));
    setTodos((prev) => prev.filter((t) => t.goalId !== id));
  };

  const addTodo = async (goalId: string, content: string, date: string) => {
    const newTodo = await createTodo(goalId, content, date);
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updated = await patchTodo(id, { isCompleted: !todo.isCompleted });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const updateTodo = async (id: string, content: string) => {
    const updated = await patchTodo(id, { content });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTodo = async (id: string) => {
    await removeTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/feed"
            element={
              <Feed
                goals={goals}
                todos={todos}
                loading={loading}
                error={error}
                onAddTodo={addTodo}
                onToggleTodo={toggleTodo}
                onUpdateTodo={updateTodo}
                onDeleteTodo={deleteTodo}
                onUpdateGoal={updateGoal}
                onDeleteGoal={deleteGoal}
              />
            }
          />
          <Route
            path="/goal"
            element={<AddGoal onAddGoal={addGoal} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
