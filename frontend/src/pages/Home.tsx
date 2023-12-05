import { Link } from "react-router-dom";
import spanishFlag from "../assets/spanish_flag.png";
import britishFlag from "../assets/uk_flag.png";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const Home = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-3xl font-bold">RegularExpressions</h1>
            {user.firstName ? (
              <p>Hello, {user.firstName}</p>
            ) : (
              <p className="py-6">
                A webpage where you can learn expressions while having fun 😁😀
              </p>
            )}

            <div className="flex flex-wrap  gap-5 justify-center  w-full ">
              <Link
                to={"/spanishExpressions"}
                className="w-fit max-w-sm hover:scale-105 duration-150 transition-all"
              >
                <img
                  src={spanishFlag}
                  className="max-w-sm rounded-md"
                  alt="I want to learn spanish expressions"
                />
              </Link>
              <Link
                to={"/englishExpressions"}
                className="w-fit max-w-sm hover:scale-105 duration-150 transition-all"
              >
                <img
                  src={britishFlag}
                  className="max-w-sm rounded-md"
                  alt="I want to learn spanish expressions"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
