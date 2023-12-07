import { ExpressionType } from "../types/types";

type Props = {
  handleDelete: (id: number) => void;
  handleValidate: (id: number) => void;
  expression: ExpressionType;
};




const UnvalidatedExpression: React.FC<Props> = ({
  handleDelete,
  handleValidate,
  expression,
}) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <p className="text-xl">{expression.expression}</p>
        <p className="text-sm">Correct Answer: {expression.rightAnswer}</p>
        <p className="text-sm">False Answer 1: {expression.falseAnswerOne}</p>
        <p className="text-sm">False Answer 2: {expression.falseAnswerTwo}</p>
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
    </div>
  );
};

export default UnvalidatedExpression;
