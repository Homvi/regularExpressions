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
  const [fadeIn, setFadeIn] = useState(false);
  const [showAnswerOne, setShowAnswerOne] = useState(false);
  const [showAnswerTwo, setShowAnswerTwo] = useState(false);
  const [showAnswerThree, setShowAnswerThree] = useState(false);

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
  const getDelayForAnswer = (answerIndex) => {
    const orderIndex = randomNumbersRef.current.indexOf(answerIndex);
    switch (orderIndex) {
      case 0: return 500; // First to appear
      case 1: return 1000; // Second to appear
      case 2: return 1500; // Third to appear
      default: return 0;
    }
  };

  useEffect(() => {
    setShowAnswerOne(false);
    setShowAnswerTwo(false);
    setShowAnswerThree(false);
  
    const timer1 = setTimeout(() => setShowAnswerOne(true), getDelayForAnswer(0));
    const timer2 = setTimeout(() => setShowAnswerTwo(true), getDelayForAnswer(1));
    const timer3 = setTimeout(() => setShowAnswerThree(true), getDelayForAnswer(2));
  
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activeExpressionIndex]);

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

  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 500);
    return () => clearTimeout(timer);
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
    <div className="h-screen flex justify-start md:m-9 items-center flex-col gap-3 font-nova">
      {loading && <p>Loading...</p>}
      {loading && <span className="loading loading-infinity loading-lg"></span>}
      {!loading && !isGameFinished && (
        <div
          id="expressionsContainer"
          className={`flex flex-col text-center justify-center w-full md:max-w-xl items-center gap-3 transition-all duration-300 ${
            fadeIn ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
          }`}
        >
          <h2 className={isFontSizeLarge ? "text-4xl my-6" : "text-2xl my-6"}>
            {activeExpression.expression}
          </h2>
          <div
  style={{ order: randomNumbersRef.current[0] }}
  onClick={() => handleChoice(activeExpression.rightAnswer)}
  className={`border-2 min-w-[200px] md:min-w-[500px] w-full flex justify-center items-center p-3 rounded-lg cursor-pointer transition-all duration-100 ${showAnswerOne ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} ${isRightAnswerChosen ? "border-green-500" : "border-gray-200"}`}
>
  <p className={isFontSizeLarge ? "text-xl" : "text-md"}>
    {activeExpression.rightAnswer}
  </p>
</div>

<div
  style={{ order: randomNumbersRef.current[1] }}
  onClick={() => handleChoice(activeExpression.falseAnswerOne)}
  className={`border-2 min-w-[200px] md:min-w-[500px] w-full flex justify-center items-center p-3 rounded-lg cursor-pointer transition-all duration-100 ${showAnswerTwo ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} ${isWrongAnswerOneChosen ? "border-red-500" : "border-gray-200"}`}
>
  <p className={isFontSizeLarge ? "text-xl" : "text-md"}>
    {activeExpression.falseAnswerOne}
  </p>
</div>

<div
  style={{ order: randomNumbersRef.current[2] }}
  onClick={() => handleChoice(activeExpression.falseAnswerTwo)}
  className={`border-2 min-w-[200px] md:min-w-[500px] w-full flex justify-center items-center p-3 rounded-lg cursor-pointer transition-all duration-100 ${showAnswerThree ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} ${isWrongAnswerTwoChosen ? "border-red-500" : "border-gray-200"}`}
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
