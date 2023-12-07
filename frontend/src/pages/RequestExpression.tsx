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
        languageOfExpression: expressionLang,
        expression,
        rightAnswer,
        falseAnswerOne,
        falseAnswerTwo,
        creatorId: loggedInUser.userId,
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
    <div className="flex flex-col justify-center w-full items-center">
      <h1 className="text-3xl text-center my-3">Request new expression</h1>
      <form
        onSubmit={requestExpression}
        className="flex flex-col bg-gray-5000 w-[700px] p-10 rounded-lg shadow-xl"
      >
        <select
          className="select w-full mb-2"
          value={expressionLang}
          onChange={(e) => setexpressionLang(e.target.value)}
        >
          <option disabled selected>
            Choose expression language
          </option>
          <option value="spanish">Spanish</option>
          <option value="english">English</option>
        </select>
        {/* expression */}
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">Expression</span>
          </div>
          <input
            type="text"
            placeholder="Expression"
            className="input input-bordered w-full"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
        </label>
        {/* right answer */}
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">Right Answer</span>
          </div>
          <input
            type="text"
            placeholder="Right Answer"
            className="input input-bordered w-full"
            value={rightAnswer}
            onChange={(e) => setRightAnswer(e.target.value)}
          />
        </label>
        {/* false answer one */}
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">First False Answer</span>
          </div>
          <input
            type="text"
            placeholder="First False Answer"
            className="input input-bordered w-full"
            value={falseAnswerOne}
            onChange={(e) => setFalseAnswerOne(e.target.value)}
          />
        </label>
        {/* false answer two */}
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">Second False Answer</span>
          </div>
          <input
            type="text"
            placeholder="Second False Answer"
            className="input input-bordered w-full"
            value={falseAnswerTwo}
            onChange={(e) => setFalseAnswerTwo(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary mt-3">
          Send
        </button>
      </form>
    </div>
  );
};

export default RequestExpression;
