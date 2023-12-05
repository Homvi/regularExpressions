import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { redirect } from "react-router-dom";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleLogout = () => {
    setLoggedInUser({});
    return redirect("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          RegularExpressions
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
            <a href="#">Accessibility</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
