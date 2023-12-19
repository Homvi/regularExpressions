import { ExpressionType } from "../types/types";

interface UnvalidatedExpressionProps {
  handleDelete: (id: number) => void;
  handleValidate: (id: number) => void;
  expression: ExpressionType;
  isFontSizeLarge: boolean;
};

const UnvalidatedExpression: React.FC<UnvalidatedExpressionProps> = ({
  handleDelete,
  handleValidate,
  expression,
  isFontSizeLarge
}) => {
  return (
      <tr>
        <td className= {isFontSizeLarge ? 'text-xl font-bold' : 'text-sm font-bold'}>{expression.expression}</td>
        <td className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>{expression.rightAnswer}</td>
        <td className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>{expression.falseAnswerOne}</td>
        <td className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>{expression.falseAnswerTwo}</td>
        <td>
        <button
          className="bg-[#60AC90] shadow-md transition-all font-bold duration-300 hover:scale-105 text-white py-2 hover:shadow-xl w-full rounded-lg px-1"
          onClick={() => handleValidate(expression.id)}
        >
          Validate
        </button>
        </td>
        <td>
        <button
          className="bg-red-500 shadow-md transition-all font-bold duration-300 hover:scale-105 text-white py-2 hover:shadow-xl w-full rounded-lg px-1"
          onClick={() => handleDelete(expression.id)}
        >
          Delete
        </button>
        </td>
      </tr>
    /*
    <div className="flex">
      <div className="flex-1">
        <p className= {isFontSizeLarge ? 'text-4xl' : 'text-2xl'}>{expression.expression}</p>
        <p className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>Correct Answer: {expression.rightAnswer}</p>
        <p className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>False Answer 1: {expression.falseAnswerOne}</p>
        <p className= {isFontSizeLarge ? 'text-xl' : 'text-sm'}>False Answer 2: {expression.falseAnswerTwo}</p>
      </div>
      <div className="flex-1">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleValidate(expression.id)}
        >
          Validate
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(expression.id)}
        >
          Delete
        </button>
      </div>
    </div>*/
  ); 
};

export default UnvalidatedExpression;
