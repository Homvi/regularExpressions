import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import logo from "../assets/exprilliant-with-text.png";

interface MobileNavbarProps {
  changeFontSize: (isLarge: boolean) => void;
  isFontSizeLarge: boolean;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  changeFontSize,
  isFontSizeLarge,
}) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoggedInUser({});
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
            <li>
              {" "}
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
              {" "}
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
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          <img src={logo} alt="Exprilliant" className="h-8" />
        </Link>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default MobileNavbar;
