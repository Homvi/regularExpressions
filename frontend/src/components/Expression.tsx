import { useEffect, useState } from "react";
import { ExpressionType } from "../types/types";

interface ExpressionProps {
  expression: ExpressionType;
  handleChoice: (choice: string) => void;
}

const Expression: React.FC<ExpressionProps> = ({
  expression,
  handleChoice,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  //create function that gives me 3 random numbers between 0 and 2
  const getRandomNumbers = () => {
    const randomNumbers:number[] = [];
    while (randomNumbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * 3);
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    return randomNumbers;
  };

  //use those numbers to randomize the order of the answers
  const randomNumbers = getRandomNumbers();

  return (
    <div
      className={
        loaded
          ? "flex flex-col justify-center items-center gap-3 transition-all duration-300 opacity-100"
          : " flex translate-x-60  flex-col justify-center items-center gap-3 transition-all duration-300 opacity-0"
      }
    >
      <h2 className="text-2xl">{expression.expression}</h2>
      <div
        style={{ order: randomNumbers[0] }}
        onClick={() => handleChoice(expression.rightAnswer)}
        className="bg-green-200 min-w-[200px] min-h-[150px] md:min-w-[500px] flex justify-center items-center p-3 rounded-lg cursor-pointer"
      >
        <p>{expression.rightAnswer}</p>
      </div>
      <div
        style={{ order: randomNumbers[1] }}
        className="bg-blue-200 min-w-[200px] min-h-[150px] md:min-w-[500px] flex justify-center items-center p-3 rounded-lg cursor-pointer"
        onClick={() => handleChoice(expression.falseAnswerOne)}
      >
        <p>{expression.falseAnswerOne}</p>
      </div>
      <div
        style={{ order: randomNumbers[2] }}
        className="bg-blue-200 min-w-[200px] min-h-[150px] md:min-w-[500px] flex justify-center items-center p-3 rounded-lg cursor-pointer"
        onClick={() => handleChoice(expression.falseAnswerTwo)}
      >
        <p>{expression.falseAnswerTwo}</p>
      </div>
    </div>
  );
};

export default Expression;
