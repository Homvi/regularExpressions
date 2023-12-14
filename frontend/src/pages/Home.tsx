import { Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import mundo from "../assets/animations/mundo.json";

interface HomeProps {
  isFontSizeLarge: boolean;
}

const Home: React.FC<HomeProps> = ({ isFontSizeLarge }) => {
  const options = {
    animationData: mundo,
    loop: true,
  };
  const { View } = useLottie(options);

  return (
    <>
      {/* lottie animation */}
      <div
        className={
          isFontSizeLarge
            ? " px-2 text-3xl min-h-screen flex-col md:flex-row items-center font-nova"
            : " px-2 text-2xl min-h-screen flex flex-col md:flex-row items-center font-nova"
        }
      >
        <div className="flex my-11 md:w-[40%] justify-center h-full">
          {View}
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-center w-full max-w-md">
            The free, fun, and effective way to learn a expressions!
          </h2>
          <div className="flex  my-9 flex-col gap-3 w-full md:w-[70%] text-center whitespace-nowrap">
            <Link
              to="/chooseLanguage"
              className="bg-[#60AC90] shadow-md transition-all duration-300 hover:scale-105 text-white py-2 hover:shadow-xl w-full rounded-lg px-1"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="bg-[#052138] shadow-md text-white py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg px-1"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
