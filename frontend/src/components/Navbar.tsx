import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/exprilliant-with-text.png";

interface NavbarProps {
  changeFontSize: (isLarge: boolean) => void;
  isFontSizeLarge: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ changeFontSize, isFontSizeLarge }) => {
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
              <Link to="/requestExpression">Request expression</Link>
            </li>
          )}
          <li>
            <details>
              <summary>Change language</summary>
              <ul className="flex">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <ul>
                      <li>
                        <button className="btn mb-2">Español</button>
                      </li>
                      <li>
                        <button className="btn">English</button>
                      </li>
                    </ul>
                  </label>
                </div>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Accesibility</summary>
              <ul className="flex">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Large font size</span>
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
              <Link to="/register">Register</Link>
            </li>
          )}
          {!loggedInUser.firstName && (
            <li>
              <Link to="/login">Log in</Link>
            </li>
          )}
          {loggedInUser.firstName && (
            <li onClick={handleLogout}>
              <a href="#">Log out</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
