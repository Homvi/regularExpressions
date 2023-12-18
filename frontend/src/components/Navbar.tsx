import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/exprilliant-with-text.png";
import {content} from "../LanguageContent.js";

interface NavbarProps {
  changeFontSize: (isLarge: boolean) => void;
  isFontSizeLarge: boolean;
  changeLanguage: (language: string) => void;
  language:string;
}

const Navbar: React.FC<NavbarProps> = ({ changeFontSize, isFontSizeLarge, changeLanguage, language }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("hash", "");
    setLoggedInUser({});
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 font-nova border-b-[1px] py-4 border-[#05213819]">
      <div className="flex-1">
        <Link
          to="/"
          className={`btn btn-ghost ${
            isFontSizeLarge ? "text-3xl" : "text-xl"
          }`}
        >
          <img src={logo} alt="Exprilliant" className="h-12" />
        </Link>
      </div>
      <div className="flex-none">
        <ul
          className={`menu menu-horizontal px-1 ${
            isFontSizeLarge ? "text-xl" : ""
          }`}
        >
          {loggedInUser.firstName && (
            <li>
              <Link to="/requestExpression">{content[language].navBar.request}</Link>
            </li>
          )}
          <li>
            <details>
              <summary>{content[language].navBar.language}</summary>
              <ul className="flex">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <ul>
                      <li onClick={() => changeLanguage("es")}>
                        <button className="btn mb-2"
                         // Pass the negation of current value
                        >Español</button>
                      </li>
                      <li onClick={() => changeLanguage("en")}>
                        <button className="btn"
                        >English</button>
                      </li>
                    </ul>
                  </label>
                </div>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>{content[language].navBar.accessibility}</summary>
              <ul className="flex">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">{content[language].navBar.font}</span>
                    <input
                      type="checkbox"
                      className="toggle ml-3"
                      onChange={() => changeFontSize(!isFontSizeLarge)} // Pass the negation of current value
                      checked={isFontSizeLarge}
                    />
                  </label>
                </div>
              </ul>
            </details>
          </li>
          {!loggedInUser.firstName && (
            <li>
              <Link to="/register">{content[language].navBar.register}</Link>
            </li>
          )}
          {!loggedInUser.firstName && (
            <li>
              <Link to="/login">{content[language].navBar.login}</Link>
            </li>
          )}
          {loggedInUser.firstName && (
            <li onClick={handleLogout}>
              <a href="#">{content[language].navBar.logout}</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
