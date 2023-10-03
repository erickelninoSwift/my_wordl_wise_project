import { login, form, row } from "./Login.module.css";
import { useState } from "react";
import { PageNavigation } from "../components/PageNavigation";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export const Login = () => {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  return (
    <main className={login}>
      <PageNavigation />
      <form className={form}>
        <div className={row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <Link to="/App">
          <Button />
        </Link>
      </form>
    </main>
  );
};
