import { Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./pages/Users";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
