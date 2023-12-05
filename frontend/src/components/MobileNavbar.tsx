import { Link, redirect } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const MobileNavbar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleLogout = () => {
    setLoggedInUser({});
    return redirect("/");
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
              <a href="#">Change language</a>
            </li>
            <li>
              {" "}
              <a href="#">Accessibility</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          RegularExpressions
        </Link>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default MobileNavbar;
