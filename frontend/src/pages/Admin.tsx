import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Expression = {
  expression: string;
  // other properties if any
};

const Admin = () => {
  const [hash, setHash] = useState("");
  const [requestedExpressions, setRequestedExpressions] = useState<Expression[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpressions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/unvalidatedExpressions",
          { hash: hash }
        );
        setRequestedExpressions(response.data);
      } catch (error) {
        console.error(error);
        // Handle the error more gracefully here
      }
    };

    const storedHash = localStorage.getItem("hash");
    if (storedHash) {
      setHash(storedHash);
      fetchExpressions();
    } else {
      navigate("/login");
    }
  }, [hash, navigate]);

  return (
    <div>
      {requestedExpressions.map((expression, index) => (
        <p key={index}>{expression.expression}</p>
      ))}
    </div>
  );
};

export default Admin;
