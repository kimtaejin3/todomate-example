import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import AddGoal from "./pages/AddGoal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="/goal" element={<AddGoal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
