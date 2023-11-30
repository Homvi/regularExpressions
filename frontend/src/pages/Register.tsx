import { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isPrivacyCheckboxChecked, setIsPrivacyCheckboxChecked] =
    useState(false);

  const handleSubmit = async () => {
    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      password,
    };
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <h1 className="text-center text-3xl my-3">Register</h1>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70%] border-[1px] border-gray-800 rounded-lg p-6 flex flex-col mx-auto my-3"
      >
        {/* firstName input */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">First name</span>
          </div>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First name"
            className="input input-bordered w-full"
          />
        </label>
        {/* lastName input */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Last name</span>
          </div>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last name"
            className="input input-bordered w-full"
          />
        </label>
        {/* userName input */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            value={lastName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="username"
            className="input input-bordered w-full"
          />
        </label>
      </form>
    </div>
  );
};

export default Register;
