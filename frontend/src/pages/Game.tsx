import { useEffect, useState } from "react";
import axios from "axios";
import Expression from "../components/Expression";
import { ExpressionType } from "../types/types";
import Score from "../components/Score";
import { useLocation } from "react-router-dom";

interface GameExpressionsProps {
  isFontSizeLarge: boolean;
}

const Game: React.FC<GameExpressionsProps> = ({ isFontSizeLarge }) => {
  const [loading, setLoading] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);

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

  const handleChoice = (choice: string) => {
    if (choice === activeExpression.rightAnswer) {
      setScore(score + 1);
    }
    if (activeExpressionIndex === 9) {
      setIsGameFinished(true);
    } else {
      setActiveExpressionIndex(activeExpressionIndex + 1);
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center flex-col gap-3 font-nova">
      {loading && <p>Loading...</p>}
      {loading && <span className="loading loading-infinity loading-lg"></span>}
      {!loading && !isGameFinished && (
        <Expression
          key={activeExpressionIndex}
          expression={activeExpression}
          handleChoice={handleChoice}
          isFontSizeLarge={isFontSizeLarge}
        />
      )}
      {isGameFinished && <Score score={score} resetGame={resetGame} />}
    </div>
  );
};

export default Game;
