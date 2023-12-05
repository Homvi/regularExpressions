import { useEffect, useState } from "react";
import axios from "axios";
import Expression from "../components/Expression";
import { ExpressionType } from "../types/types";

const SpanishExpressions = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [loading, setLoading] = useState(true);

/*   const expressionsData = [
    {
      id: 1,
      expression: "Meter la pata",
      rightAnswer: "To make a mistake",
      falseAnswerOne: "To have good luck",
      falseAnswerTwo: "To be angry",
    },
    {
      id: 2,
      expression: "Estar en las nubes",
      rightAnswer:
        "Daydreaming or thinking about something unrelated to reality",
      falseAnswerOne: "Being very focused on a task",
      falseAnswerTwo: "Feeling light and happy",
    },
    {
      id: 3,
      expression: "Dar en el clavo",
      rightAnswer: "To find the right solution",
      falseAnswerOne: "To accidentally hit something with a nail",
      falseAnswerTwo: "To make a mistake while attempting something",
    },
    {
      id: 4,
      expression: "Salirse con la suya",
      rightAnswer: "To achieve your goal, against the wishes of others",
      falseAnswerOne: "To abandon a project before completing it",
      falseAnswerTwo: "To face the consequences of an action",
    },
    {
      id: 5,
      expression: "Costar un ojo de la cara / Costar un riñón",
      rightAnswer: "To be very expensive",
      falseAnswerOne: "To experience great physical effort",
      falseAnswerTwo: "To have a high sentimental value",
    },
    {
      id: 6,
      expression: "Hablar por los codos",
      rightAnswer: "To talk a lot or non-stop",
      falseAnswerOne: "To speak through your elbows",
      falseAnswerTwo: "To communicate using gestures",
    },
    {
      id: 7,
      expression: "Tomar el pelo",
      rightAnswer: "To tease or make fun of someone",
      falseAnswerOne: "To brush your hair",
      falseAnswerTwo: "To help someone",
    },
    {
      id: 8,
      expression: "Eso es pan comido",
      rightAnswer: "That is an easy task",
      falseAnswerOne: "That is eaten bread",
      falseAnswerTwo: "That is a difficult task",
    },
    {
      id: 9,
      expression: "Tener algo en la punta de la lengua",
      rightAnswer:
        "When we know something but it doesn't come to us right away",
      falseAnswerOne: "To be an eloquent speaker",
      falseAnswerTwo: "To remember something suddenly",
    },
    {
      id: 10,
      expression: "De tal palo, tal astilla",
      rightAnswer: "To be similar to your parents",
      falseAnswerOne: "To be a family of carpenters",
      falseAnswerTwo: "To have a good relation with your family",
    },
  ]; */

  const [expressions, setExpressions] = useState<ExpressionType[]>([]);
  const [activeExpressionIndex, setActiveExpressionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const getTenRandomExpressions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getSpanishExpressions"
      );
      console.log(response.data);
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

  const handleChoice = (choice: string) => {
    if (choice === activeExpression.rightAnswer) {
      setScore(score + 1);
    }
    if (activeExpressionIndex === 9) {
      //calculate percentage of score
      const percentage = (score / 10) * 100;
      alert(`Game over! Your score is ${percentage}%`);
      setIsGameStarted(false);
      setScore(0);
      setActiveExpressionIndex(0);
    } else {
      setActiveExpressionIndex(activeExpressionIndex + 1);
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center flex-col gap-3">
      <h1>SpanishExpressions</h1>
      {loading && <p>Loading...</p>}
      {!isGameStarted && (
        <button
          onClick={() => setIsGameStarted(true)}
          className="btn btn-primary"
        >
          Start game
        </button>
      )}
      {isGameStarted && (
        <Expression
          key={activeExpressionIndex}
          expression={activeExpression}
          handleChoice={handleChoice}
        />
      )}
    </div>
  );
};

export default SpanishExpressions;
