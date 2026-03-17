import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import AddGoal from "./pages/AddGoal";
import { GoalProvider } from "./context/GoalProvider";
import { TodoProvider } from "./context/TodoProvider";

function App() {
  return (
    <GoalProvider>
      <TodoProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/feed" element={<Feed />} />
              <Route path="/goal" element={<AddGoal />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TodoProvider>
    </GoalProvider>
  );
}

export default App;
