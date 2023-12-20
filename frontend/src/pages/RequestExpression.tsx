import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../UserContext";
import {content} from "../LanguageContent.js";


interface RequestExpressionProps {
  isFontSizeLarge: boolean;
  language:string;
}

const RequestExpression: React.FC<RequestExpressionProps> = ({ isFontSizeLarge, language }) => {
  const [expressionLang, setexpressionLang] = useState("Spanish");
  const [expression, setExpression] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [falseAnswerOne, setFalseAnswerOne] = useState("");
  const [falseAnswerTwo, setFalseAnswerTwo] = useState("");

  const [loggedInUser] = useContext(UserContext);

  const requestExpression = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(loggedInUser);

    const newExpression = {
      languageOfExpression: expressionLang.toLowerCase(),
      expression,
      rightAnswer,
      falseAnswerOne,
      falseAnswerTwo,
      creatorId: loggedInUser.userId,
    };

    console.log(newExpression);

    try {
      const response = await axios.post(
        "http://localhost:8080/sendExpression",
        newExpression
      );
      console.log(response);
      toast(content[language].request.requestOk);
      setExpression("");
      setRightAnswer("");
      setFalseAnswerOne("");
      setFalseAnswerTwo("");
    } catch (error) {
      console.log(error);
      toast.error(content[language].request.requestFail);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full items-center font-nova mt-28">
      <ToastContainer />
      <h1 className={`text-center my-3 ${isFontSizeLarge ? 'text-4xl' : 'text-3xl'}`}>{content[language].request.request}</h1>
      <form
        onSubmit={requestExpression}
        className="flex flex-col bg-gray-5000 w-[700px] p-10 rounded-lg shadow-xl"
      >
        <select
          className={isFontSizeLarge ? 'select w-full mb-2 text-xl' : 'select w-full mb-2 text-md'}
          value={expressionLang}
          onChange={(e) => setexpressionLang(e.target.value)}
        >
          <option value="Spanish">{content[language].request.spanish}</option>
          <option value="English">{content[language].request.english}</option>
        </select>
        {/* expression */}
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className={isFontSizeLarge ? 'label-text text-xl' : ' label-text text-md'}>{content[language].request.expression}</span>
          </div>
          <input
            type="text"
            placeholder={expressionLang.toLowerCase() === "spanish" ? "Meter la pata" : "Piece of cake"}
            className="input input-bordered w-full"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
        </label>
        {/* right answer */}
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className={isFontSizeLarge ? 'label-text text-xl' : ' label-text text-md'}>{content[language].request.right}</span>
          </div>
          <input
            type="text"
            placeholder={expressionLang.toLowerCase() === "spanish" ? "To make a mistake" : "Algo fácil de hacer"}
            className="input input-bordered w-full"
            value={rightAnswer}
            onChange={(e) => setRightAnswer(e.target.value)}
          />
        </label>
        {/* false answer one */}
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className={isFontSizeLarge ? 'label-text text-xl' : ' label-text text-md'}>{content[language].request.false1}</span>
          </div>
          <input
            type="text"
            placeholder={expressionLang.toLowerCase() === "spanish" ? "To have good luck" : "Ser un trozo de tarta"}
            className="input input-bordered w-full"
            value={falseAnswerOne}
            onChange={(e) => setFalseAnswerOne(e.target.value)}
          />
        </label>
        {/* false answer two */}
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className={isFontSizeLarge ? 'label-text text-xl' : ' label-text text-md'}>{content[language].request.false2}</span>
          </div>
          <input
            type="text"
            placeholder={expressionLang.toLowerCase() === "spanish" ? "To be angry" : "Algo complicado de hacer"}
            className="input input-bordered w-full"
            value={falseAnswerTwo}
            onChange={(e) => setFalseAnswerTwo(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary mt-3">
        {content[language].request.send}
        </button>
      </form>
    </div>
  );
};

export default RequestExpression;
