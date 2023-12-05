import { useEffect, useState } from "react";
import axios from "axios"

const SpanishExpressions = () => {

    type Expression = {
        id: number;
        expression: string;
        rightAnswer: string;
        falseAnswerOne: string;
        falseAnswerTwo: string;
    }

    const [expressions, setExpressions] = useState<Expression[]>([]);

    const getTenRandomExpressions = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getSpanishExpressions ");
            console.log(response.data);
            setExpressions(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
    getTenRandomExpressions();
    }, [])
    
  return (
    <div>
        <h1>SpanishExpressions</h1>
        {expressions.length && expressions.map((expression) => (
            <div key={expression.id}>
                <h2>{expression.expression}</h2>
            </div>
        ))}
    </div>
  )
}

export default SpanishExpressions