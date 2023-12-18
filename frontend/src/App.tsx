import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import Admin from "./pages/Admin";
import RequestExpression from "./pages/RequestExpression";
import { useState } from "react";
import ChooseLanguage from "./pages/ChooseLanguage";
import Game from "./pages/Game";

function App() {
  const [isFontSizeLarge, setIsFontSizeLarge] = useState(false);

  const changeFontSize = () => {
    setIsFontSizeLarge(!isFontSizeLarge);
  };

  const [language, setLanguage] = useState("en");

  const changeLanguage = (language:string) => {
    setLanguage(language);
  };

  return (
    <>
      <div className="hidden md:block">
        <Navbar
          changeFontSize={changeFontSize}
          isFontSizeLarge={isFontSizeLarge}

          changeLanguage={changeLanguage}
        />
      </div>
      <div className="block md:hidden">
        <MobileNavbar
          changeFontSize={changeFontSize}
          isFontSizeLarge={isFontSizeLarge}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home isFontSizeLarge={isFontSizeLarge} language={language}/>} />
        <Route
          path="/register"
          element={<Register isFontSizeLarge={isFontSizeLarge} />}
        />
        <Route
          path="/login"
          element={<Login isFontSizeLarge={isFontSizeLarge} />}
        />
        <Route
          path="/chooseLanguage"
          element={<ChooseLanguage isFontSizeLarge={isFontSizeLarge} />}
        />
        <Route
          path="/spanishExpressions"
          element={<Game isFontSizeLarge={isFontSizeLarge} />}
        />
        <Route
          path="/englishExpressions"
          element={<Game isFontSizeLarge={isFontSizeLarge} />}
        />
        <Route
          path="/requestExpression"
          element={<RequestExpression isFontSizeLarge={isFontSizeLarge} />}
        />
        <Route
          path="/admin"
          element={<Admin isFontSizeLarge={isFontSizeLarge} />}
        />
      </Routes>
    </>
  );
}

export default App;
