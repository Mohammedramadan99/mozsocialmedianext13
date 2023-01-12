import Link from "next/link";
import Users from "./Users";
import AddCount from "./IncrementCounter";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, registerUserAction } from "../store/counterSlice";
const Page = (props) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginUserAction(userData));
  };
  const signinHandler = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    dispatch(registerUserAction(userData));
  };
  return (
    <div>
      <h1 style={{ backgroundColor: "#ddd" }}>{props.title}</h1>
      <h3>{userAuth?.name}</h3>
      <Users />
      <form onSubmit={(e) => loginHandler(e)}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      <br />
      <nav>
        <Link href={props.linkTo}>
          Navigate
        </Link>
      </nav>
      <form onSubmit={(e) => signinHandler(e)}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Page;
