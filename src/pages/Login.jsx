import { login, form, row } from "./Login.module.css";
import { useEffect, useState } from "react";
import { PageNavigation } from "../components/PageNavigation";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigation = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { isAuthenticated, loginUser, userError, user } = useAuth();

  const handleLogin = () => {
    if (!email && !password) return;
    loginUser(email, password);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    navigation("/App", { replace: true });
    console.log(user);
  }, [isAuthenticated, navigation]);

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
        <Link>
          <Button onclick={handleLogin} />
        </Link>
      </form>
    </main>
  );
};
