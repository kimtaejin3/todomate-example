import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import AddGoal from "./pages/AddGoal";
import { useGoalStore } from "./store/useGoalStore";
import { useTodoStore } from "./store/useTodoStore";

function StoreInitializer() {
  useEffect(() => {
    useGoalStore.getState().fetchGoals();
    useTodoStore.getState().fetchTodos();
  }, []);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <StoreInitializer />
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="/goal" element={<AddGoal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
