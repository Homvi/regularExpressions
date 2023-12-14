import axios from "axios";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegisterProps {
  isFontSizeLarge: boolean;
}

const Register: React.FC<RegisterProps> = ({isFontSizeLarge}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isPrivacyCheckboxChecked, setIsPrivacyCheckboxChecked] =
    useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPrivacyCheckboxChecked) {
      toast.error("Accept privacy!");
      return;
    }

    if (password !== passwordAgain) {
      toast.error("The two password doesn't match");
      return;
    }

    const newUser = {
      firstName: firstName,
      surname: lastName,
      username: userName,
      email: email,
      password: password,
    };

    console.log(newUser);
    try {
      console.log("Trying to post data");
      const response = await axios.post(
        "http://localhost:8080/register",
        newUser
      );
      console.log(response);
      toast("The registration was successfull");
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
      setPasswordAgain("");
    } catch (error) {
      toast.error("Oops it didn't work!");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center font-nova">
      <ToastContainer />
      <h1 className={`text-center my-3 ${isFontSizeLarge ? 'text-4xl' : 'text-3xl'}`}>Register</h1>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70%] border-[1px] border-gray-100 p-6 flex flex-col mx-auto my-3"
      >
        {/* firstName input */}
        <label className="form-control w-full">
          <div className="label">
            <span className={`label-text ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>First name</span>
          </div>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            required
            placeholder="First name"
            className="input input-bordered w-full"
          />
        </label>
        {/* lastName input */}
        <label className="form-control w-full">
          <div className="label">
          <span className={`label-text ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>Last name</span>
          </div>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            required
            placeholder="Last name"
            className="input input-bordered w-full"
          />
        </label>
        {/* userName input */}
        <label className="form-control w-full">
          <div className="label">
          <span className={`label-text ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>Username</span>
          </div>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            required
            placeholder="username"
            className="input input-bordered w-full"
          />
        </label>
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
        {/* passwordAgain input */}
        <label className="form-control w-full">
          <div className="label">
          <span className={`label-text ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>Password again</span>
          </div>
          <input
            value={passwordAgain}
            required
            onChange={(e) => setPasswordAgain(e.target.value)}
            type="password"
            className="input input-bordered w-full"
          />
        </label>
        {/* Privacy */}
        <div className="form-control my-3 ">
          <label className="label cursor-pointer">
          <span className={`label-text ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>
              I have read an accept the privacy policy
            </span>
            <input
              type="checkbox"
              onChange={() =>
                setIsPrivacyCheckboxChecked(!isPrivacyCheckboxChecked)
              }
              checked={isPrivacyCheckboxChecked}
              className="checkbox"
            />
          </label>
        </div>
        <button type="submit" className={`btn btn-primary ${isFontSizeLarge ? 'text-xl' : 'text-md'}`}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
