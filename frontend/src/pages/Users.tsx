import { useEffect, useState } from "react";
import User from "../components/User";

const Users = () => {
  /*   const users = [
    {
      userId: 1,
      firstName: "Adam",
      surname: "Honvedo",
      username: "adam.honvedo",
      email: "adam.honvedo@gmail.com",
      password: "1234",
    },
    {
      userId: 2,
      firstName: "Adrian",
      surname: "Montes",
      username: "adrianceroca",
      email: "adrianceroca@gmail.com",
      password: "1234",
    },
    {
      userId: 3,
      firstName: "Alvaro",
      surname: "Carceles",
      username: "alvaro",
      email: "albotarell@gmail.com",
      password: "1234",
    },
    {
      userId: 4,
      firstName: "User1",
      surname: "user1",
      username: "user1",
      email: "user1@gmail.com",
      password: "1234",
    },
  ];
 */
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/users");
    const users = await response.json();
    console.log(users);
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {users.map((user, id) => (
        <User user={user} key={id} />
      ))}
    </>
  );
};

export default Users;
