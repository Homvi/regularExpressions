import { Link } from "react-router-dom";
import spanishFlag from "../assets/spanish_flag.png";
import britishFlag from "../assets/uk_flag.png";
import { UserContext } from "../UserContext";
import { useContext } from "react";

interface HomeProps {
  isFontSizeLarge: boolean;
}

const Home: React.FC<HomeProps> = ({ isFontSizeLarge }) => {
  const [user] = useContext(UserContext);

  return (
    <>
    
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div>
            <h1 className='font-bold text-xl'></h1>
            {user.firstName ? (
              <p className={isFontSizeLarge ? 'text-xl' : 'text-md'}>Hello, {user.firstName}</p>
            ) : (
              <p className={isFontSizeLarge ? ' py-6 text-3xl' : 'py-6 text-xl'}>
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
            {!user.firstName && (
              <Link to={"/register"}>
                <button className={`btn btn-accent my-6 ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>
                  Register to add your own expression
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
