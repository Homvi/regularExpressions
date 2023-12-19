import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import {content} from "../LanguageContent.js";

interface LoginProps {
  isFontSizeLarge: boolean;
  language:string;
}

const Login: React.FC<LoginProps> = ({isFontSizeLarge, language}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8080/login", user);
      toast(content[language].login.loginOk);
      setEmail("");
      setPassword("");
      console.log("The response data is: ", response.data);
      
      setLoggedInUser({
        firstName: response.data.firstname,
        lastName: response.data.surname,
        userId: response.data.id,
        userName: response.data.username,
      });
      if (response.data.hash != null) {
        localStorage.setItem("hash", response.data.hash);
      }
      if (response.data.hash === null) {
        localStorage.setItem("hash", "");
      }
          navigate("/");
    } catch (error) {
      toast(content[language].login.loginFail);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center font-nova">
      <ToastContainer />
      <h1 className={`text-center my-3 ${isFontSizeLarge ? 'text-4xl' : 'text-3xl'}`}>{content[language].login.login}</h1>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70%] border-[1px] border-gray-100 p-6 flex flex-col mx-auto my-3"
      >
        {/* email input */}
        <label className="form-control w-full">
          <div className="label">
            <span className={`label-text ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>{content[language].login.email}</span>
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="johndoe@gmail.com"
            className="input input-bordered w-full"
          />
        </label>
        {/* password input */}
        <label className="form-control w-full">
          <div className="label">
          <span className={`label-text ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>{content[language].login.pass}</span>
          </div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="input input-bordered w-full"
          />
        </label>
        <button type="submit" className="mt-3 bg-[#052138] shadow-md text-white py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg px-1">
        {content[language].login.login}
        </button>
      </form>
    </div>
  );
};

export default Login;
