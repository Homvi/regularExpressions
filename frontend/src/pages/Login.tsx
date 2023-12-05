import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    console.log(user);
    try {
      console.log("Trying to post data");
      const response = await axios.post("http://localhost:8080/login", user);
      console.log(response);
      toast("You have succesfully logged in!");
      setEmail("");
      setPassword("");
      setLoggedInUser({
        firstName: response.data.firstname,
        lastName: response.data.surname,
        userId: response.data.id,
        userName: response.data.username,
      });
      history.push("/");
    } catch (error) {
      toast("Oops it didn't work!");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <ToastContainer />
      <h1 className="text-center text-3xl my-3">Log in</h1>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70%] border-[1px] border-gray-100 p-6 flex flex-col mx-auto my-3"
      >
        {/* email input */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email</span>
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
            <span className="label-text">Password</span>
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
