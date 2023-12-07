import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import SpanishExpressions from "./pages/SpanishExpressions";
import EnglishExpressions from "./pages/EnglishExpressions";
import Admin from "./pages/Admin";
import RequestExpression from "./pages/RequestExpression";

function App() {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/spanishExpressions" element={<SpanishExpressions />} />
        <Route path="/englishExpressions" element={<EnglishExpressions />} />
        <Route path="/requestExpression" element={<RequestExpression />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
