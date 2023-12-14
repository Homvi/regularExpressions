import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  isFontSizeLarge: boolean;
}

const Login: React.FC<LoginProps> = ({isFontSizeLarge}) => {
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
      toast("You have succesfully logged in!");
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
      toast("Oops it didn't work!");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center font-nova">
      <ToastContainer />
      <h1 className={`text-center my-3 ${isFontSizeLarge ? 'text-4xl' : 'text-3xl'}`}>Log in</h1>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70%] border-[1px] border-gray-100 p-6 flex flex-col mx-auto my-3"
      >
        {/* email input */}
        <label className="form-control w-full">
          <div className="label">
            <span className={`label-text ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>Email</span>
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="email"
            className="input input-bordered w-full"
          />
        </label>
        {/* password input */}
        <label className="form-control w-full">
          <div className="label">
          <span className={`label-text ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>Password</span>
          </div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="input input-bordered w-full"
          />
        </label>
        <button type="submit" className="btn btn-primary my-3">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
