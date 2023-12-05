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
        onClick={() => handleChoice(expression.rightAnswer)}
        className="bg-blue-200 min-w-[200px] min-h-[150px] md:min-w-[500px] flex justify-center items-center p-3 rounded-lg cursor-pointer"
      >
        <p>{expression.rightAnswer}</p>
      </div>
      <div
        className="bg-blue-200 min-w-[200px] min-h-[150px] md:min-w-[500px] flex justify-center items-center p-3 rounded-lg cursor-pointer"
        onClick={() => handleChoice(expression.falseAnswerOne)}
      >
        <p>{expression.falseAnswerOne}</p>
      </div>
      <div
        className="bg-blue-200 min-w-[200px] min-h-[150px] md:min-w-[500px] flex justify-center items-center p-3 rounded-lg cursor-pointer"
        onClick={() => handleChoice(expression.falseAnswerTwo)}
      >
        <p>{expression.falseAnswerTwo}</p>
      </div>
    </div>
  );
};

export default Expression;
