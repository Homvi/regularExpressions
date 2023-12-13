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
      <li>
            <a href="#">Change language</a>
          </li>
          <li>
          <details>
          <summary>
            Accesibility
          </summary>
          <ul className="flex">
            <div>Large font size</div>
            <input
              type="checkbox" className="toggle ml-3" 
              onChange={() => changeFontSize(!isFontSizeLarge)} // Pass the negation of current value
              checked={isFontSizeLarge}
              />
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
