import React, { useState, useEffect } from "react";
import { useLottie } from "lottie-react";
import check from "../assets/animations/check.json";
import fireworks from "../assets/animations/fireworks.json";
import { Link } from "react-router-dom";
import {content} from "../LanguageContent.js";

interface ScoreProps {
  score: number;
  resetGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
  language:string;
}

const Score: React.FC<ScoreProps> = ({ score, resetGame, language }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  const animation = score > 9 ? fireworks : check;
  const hasToLoop = score > 9 ? true : false;

  const options = {
    animationData: animation,
    loop: hasToLoop,
  };

  const { View } = useLottie(options);

  useEffect(() => {
    // Duration of the animation in milliseconds
    const duration = 300;
    // The increment per update to reach the final score in the given duration
    const increment = score / (duration / 100);
    let currentScore = 0;

    const interval = setInterval(() => {
      currentScore += increment;
      if (currentScore < score) {
        setAnimatedScore(currentScore);
      } else {
        // Ensure the final score is set correctly and clear the interval
        setAnimatedScore(score);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [score]);

  return (
    <div className="absolute left-0 right-0 bottom-0 top-0 flex justify-start flex-col items-center gap-6">
      <div className="max-w-sm">{View}</div>
      <h2 className="text-[#052138a4] text-2xl">
        {content[language].score.score}{" "}
        <span className={ score > 9 ? "text-[#a39301] animate-pulse duration-75 transition-all": "text-[#FF9600]"}>
          {Math.round((animatedScore / 10) * 100)}%
        </span>
      </h2>
      {score <= 9 && <h3 className="text-[#052138a4] text-xl tracking-widest">{content[language].score.good}</h3>}
      {score > 9 && <h3 className="text-[#a39301] text-xl tracking-widest">{content[language].score.excellent}!</h3>}
      <div className="flex gap-6 justify-center w-full text-center">
        <Link
          className="bg-[#052138] whitespace-nowrap shadow-md text-white py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl w-[40%] rounded-lg px-1 max-w-[200px]"
          to={"/"}
        >
          {content[language].score.main}
        </Link>
        <button
          onClick={resetGame}
          className="bg-[#60AC90] whitespace-nowrap shadow-md text-white py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl w-[40%] rounded-lg px-1 max-w-[200px]"
        >
          {content[language].score.more}
        </button>
      </div>
    </div>
  );
};

export default Score;
