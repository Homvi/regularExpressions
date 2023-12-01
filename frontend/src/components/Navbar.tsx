import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          RegularExpressions
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
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
