import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import AddGoal from "./pages/AddGoal";
import type { Goal, Todo } from "./types";
import { useState } from "react";

const GOALS: Goal[] = [
  { id: 1, name: "운동", color: "#797ef6" },
  { id: 2, name: "공부", color: "#fe93b5" },
];

const TODOS: Todo[] = [
  {
    id: 1,
    goalId: 1,
    content: "헬스장 가기",
    isCompleted: false,
    date: "2026-03-15",
  },
  {
    id: 2,
    goalId: 1,
    content: "스트레칭",
    isCompleted: true,
    date: "2026-03-15",
  },
  {
    id: 3,
    goalId: 2,
    content: "리액트 공부",
    isCompleted: false,
    date: "2026-03-15",
  },
  {
    id: 4,
    goalId: 2,
    content: "타입스크립트 복습",
    isCompleted: false,
    date: "2026-03-16",
  },
];

function App() {
  const [goals, setGoals] = useState(GOALS);
  const [todos, setTodos] = useState(TODOS);

  const addGoal = (name: string, color: string) => {
    setGoals([...goals, { id: Date.now(), name, color }]);
  };

  const updateGoal = (id: number, name: string) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, name } : g)));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id));
    setTodos(todos.filter((t) => t.goalId !== id));
  };

  const addTodo = (goalId: number, content: string, date: string) => {
    setTodos([
      ...todos,
      { id: Date.now(), goalId, content, isCompleted: false, date },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  };

  const updateTodo = (id: number, content: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, content } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
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
