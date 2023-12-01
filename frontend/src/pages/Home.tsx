import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 className="text-center">Home page</h1>
      <div className="flex flex-col gap-3 ">
        <Link to="/login">
          <button className="btn btn-primary my-3">Log in</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-secondary my-3">Register</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
