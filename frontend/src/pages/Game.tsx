import { useEffect, useRef, useState } from "react";
import axios from "axios";
//import Expression from "../components/Expression";
import { ExpressionType } from "../types/types";
import Score from "../components/Score";
import { useLocation } from "react-router-dom";

interface GameExpressionsProps {
  isFontSizeLarge: boolean;
}

const Game: React.FC<GameExpressionsProps> = ({ isFontSizeLarge }) => {
  const [loading, setLoading] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isRightAnswerChosen, setIsRightAnswerChosen] = useState(false);
  const [isWrongAnswerOneChosen, setIsWrongAnswerOneChosen] = useState(false);
  const [isWrongAnswerTwoChosen, setIsWrongAnswerTwoChosen] = useState(false);

  const location = useLocation();

  const expressionsType = location.pathname.split("/")[1];

  let url = "";
  if (expressionsType === "spanishExpressions") {
    url = "http://localhost:8080/getSpanishExpressions";
  } else if (expressionsType === "englishExpressions") {
    url = "http://localhost:8080/getEnglishExpressions";
  }

  const [expressions, setExpressions] = useState<ExpressionType[]>([]);
  const [activeExpressionIndex, setActiveExpressionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const getTenRandomExpressions = async () => {
    try {
      const response = await axios.get(url);
      setExpressions(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const activeExpression = expressions[activeExpressionIndex];
  const getRandomNumbers = () => {
    const randomNumbers: number[] = [];
    while (randomNumbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * 3);
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    return randomNumbers;
  };
  const randomNumbersRef = useRef(getRandomNumbers());

  useEffect(() => {
    getTenRandomExpressions();
  }, []);

  const resetGame = () => {
    setLoading(true);
    getTenRandomExpressions();
    setIsGameFinished(false);
    setScore(0);
    setActiveExpressionIndex(0);
  };

  const executeAnimation = () => {
    console.log("executeAnimation");
  };

  useEffect(() => {
    executeAnimation();
  }, [activeExpressionIndex]);

  const handleChoice = (choice: string) => {
    if (choice === activeExpression.rightAnswer) {
      setIsRightAnswerChosen(true);
      setScore(score + 1);
    }
    if (activeExpressionIndex === 9) {
      setTimeout(() => {
        setIsGameFinished(true);
      }, 3000);
    }
    if (choice === activeExpression.falseAnswerOne) {
      setIsWrongAnswerOneChosen(true);
      setIsRightAnswerChosen(true);
    }
    if (choice === activeExpression.falseAnswerTwo) {
      setIsWrongAnswerTwoChosen(true);
      setIsRightAnswerChosen(true);
    }
    setTimeout(() => {
      setIsRightAnswerChosen(false);
      setIsWrongAnswerOneChosen(false);
      setIsWrongAnswerTwoChosen(false);
      handleActiveEexpressionIncrement();
    }, 3000);
  };

  const handleActiveEexpressionIncrement = () => {
    setActiveExpressionIndex((curr) => curr + 1);
    randomNumbersRef.current = getRandomNumbers();
  };

  return (
    <div className=" h-screen flex justify-start md:m-9 items-center flex-col gap-3 font-nova">
      {loading && <p>Loading...</p>}
      {loading && <span className="loading loading-infinity loading-lg"></span>}
      {!loading && !isGameFinished && (
        /*    <Expression
          key={activeExpressionIndex}
          expression={activeExpression}
          handleChoice={handleChoice}
          isFontSizeLarge={isFontSizeLarge}
        /> */
        <div
          className={
            "flex flex-col justify-center w-full md:max-w-xl items-center gap-3 transition-all duration-300 opacity-100"
          }
        >
          <h2 className={isFontSizeLarge ? "text-4xl" : "text-2xl"}>
            {activeExpression.expression}
          </h2>
          <div
            style={{ order: randomNumbersRef.current[0] }}
            onClick={() => handleChoice(activeExpression.rightAnswer)}
            className={`border-2 min-w-[200px]  md:min-w-[500px] w-full flex justify-center items-center p-3 rounded-lg cursor-pointer ${
              isRightAnswerChosen && "border-2 border-green-500"
            }`}
          >
            <p className={isFontSizeLarge ? "text-xl" : "text-md"}>
              {activeExpression.rightAnswer}
            </p>
          </div>
          <div
            style={{ order: randomNumbersRef.current[1] }}
            className={`border-2 min-w-[200px]  md:min-w-[500px] w-full flex justify-center items-center p-3 rounded-lg cursor-pointer ${
              isWrongAnswerOneChosen && "border-2 border-red-500"
            }`}
            onClick={() => handleChoice(activeExpression.falseAnswerOne)}
          >
            <p className={isFontSizeLarge ? "text-xl" : "text-md"}>
              {activeExpression.falseAnswerOne}
            </p>
          </div>
          <div
            style={{ order: randomNumbersRef.current[1] }}
            className={`border-2 min-w-[200px]  md:min-w-[500px] w-full flex justify-center items-center p-3 rounded-lg cursor-pointer ${
              isWrongAnswerTwoChosen && "border-2 border-red-500"
            }`}
            onClick={() => handleChoice(activeExpression.falseAnswerTwo)}
          >
            <p className={isFontSizeLarge ? "text-xl" : "text-md"}>
              {activeExpression.falseAnswerTwo}
            </p>
          </div>
        </div>
      )}
      {isGameFinished && <Score score={score} resetGame={resetGame} />}
    </div>
  );
};

export default Game;
