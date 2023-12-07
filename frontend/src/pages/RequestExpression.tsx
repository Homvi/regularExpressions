/* type ExpressionType = {
  expression: string;
  rightAnswer: string;
  falseAnswerOne: string;
  falseAnswerTwo: string;
}; */

import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { UserContext } from "../UserContext";

const RequestExpression = () => {
  const [expressionLang, setexpressionLang] = useState("spanish");
  const [expression, setExpression] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [falseAnswerOne, setFalseAnswerOne] = useState("");
  const [falseAnswerTwo, setFalseAnswerTwo] = useState("");

  const [loggedInUser] = useContext(UserContext);

  const requestExpression = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newExpression = {
        expressionLang,
        expression,
        rightAnswer,
        falseAnswerOne,
        falseAnswerTwo,
        userId: loggedInUser.userId,
      };

      const response = axios.post(
        "http://localhost/8080/sendExpression",
        newExpression
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        action="#"
        method="post"
        onSubmit={requestExpression}
        className="flex flex-col bg-gray-200 max-w-2xl p-10 rounded-lg shadow-xl"
      >
        <select
          className="select w-full max-w-xs"
          value={expressionLang}
          onChange={(e) => setexpressionLang(e.target.value)}
        >
          <option disabled selected>
            Choose expression language
          </option>
          <option value="Spanish">Spanish</option>
          <option value="English">English</option>
        </select>
        <input
          type="text"
          placeholder="Enter expression"
          className="input input-ghost w-full max-w-xs"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter right answer"
          className="input input-ghost w-full max-w-xs"
          value={rightAnswer}
          onChange={(e) => setRightAnswer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter first false answer"
          className="input input-ghost w-full max-w-xs"
          value={falseAnswerOne}
          onChange={(e) => setFalseAnswerOne(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter second false answer"
          className="input input-ghost w-full max-w-xs"
          value={falseAnswerTwo}
          onChange={(e) => setFalseAnswerTwo(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default RequestExpression;
