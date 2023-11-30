import { Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./pages/Users";

function App() {
  return (
    <div className="bg-cover svg-bcg min-h-screen relative">
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
  );
}

export default App;
