import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import AddGoal from "./pages/AddGoal";
import { Suspense } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>로딩 중...</div>}>
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/goal" element={<AddGoal />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
