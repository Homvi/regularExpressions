import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext} from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="navbar bg-base-100">
      <div className="flex-1">
      <Link to="/" className={`btn btn-ghost ${isFontSizeLarge ? 'text-3xl' : 'text-xl'}`}>
          RegularExpressions
        </Link>
      </div>
      <div className="flex-none">
      <ul className={`menu menu-horizontal px-1 ${isFontSizeLarge ? 'text-xl' : ''}`}>
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
            <a href="#">Change language</a>
          </li>
          <li>
          <details>
          <summary>
            Accesibility
          </summary>
          <ul className=" bg-base-100 rounded-t-none flex">
            <div>Large font size</div>
            <input
              type="checkbox"
              onChange={() => changeFontSize(!isFontSizeLarge)} // Pass the negation of current value
              checked={isFontSizeLarge}
              className="checkbox"
              />
          </ul>
        </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
