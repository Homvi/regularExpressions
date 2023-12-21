import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnvalidatedExpression from "../components/UnvalidatedExpression";
import { ExpressionType } from "../types/types";
import {content} from "../LanguageContent.js";


interface AdminProps {
  isFontSizeLarge: boolean;
  language: string;
}

const Admin: React.FC<AdminProps> = ({isFontSizeLarge, language }) => {
  /*  const expressionsData = [
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
  ];
 */
  const [requestedExpressions, setRequestedExpressions] = useState<
    ExpressionType[]
  >([]);
  const navigate = useNavigate();

  //GET expressions
  const fetchExpressions = async () => {
    const hash = localStorage.getItem("hash");
    console.log("hash from local storage", hash);

    try {
      console.log("Entering try block");

      const response = await axios.post(
        "http://localhost:8080/unvalidatedExpressions",
        { hash: hash }
      );
      console.log(response);
      setRequestedExpressions(response.data);
    } catch (error) {
      console.error(error);
      navigate("/login");
      // Handle the error more gracefully here
    }
  };

  const handleDeleteExpression = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/deleteExpression`,
        {
          data: { id: id },
        }
      );
      console.log(response);

      fetchExpressions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleValidateExpression = async (id: number) => {
    try {
      console.log("id", id);
      const response = await axios.patch(
        "http://localhost:8080/validateExpression",
        { id: id }
      );
      console.log(response);

      fetchExpressions();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("hash")) {
      navigate("/login");
    }

    fetchExpressions();

    /*   const storedHash = localStorage.getItem("hash");
    if (storedHash) {
      setHash(storedHash);
      fetchExpressions();
    } else {
      navigate("/login");
    } */
  }, [navigate]);

  return (
    <div>
      {!requestedExpressions && <p>Loading...</p>}
      <div className="overflow-x-auto mt-20">
      <table className="table my-10">
    <thead>
      <tr>
        <th className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>{content[language].request.expression}</th>
        <th className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>{content[language].request.right}</th>
        <th className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>{content[language].request.false1}</th>
        <th className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>{content[language].request.false2}</th>
      </tr>
    </thead>
    <tbody>
      {requestedExpressions &&
        requestedExpressions.map((expression) => (
          <UnvalidatedExpression
            handleDelete={handleDeleteExpression}
            handleValidate={handleValidateExpression}
            expression={expression}
            key={expression.id}
            isFontSizeLarge = {isFontSizeLarge}
          />
        ))}
    </tbody>
  </table>
  </div>
    </div>
  );
};

export default Admin;
