import { http } from "@/utils";
import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = () => {
    http
      .post<string>("/login", { username, password })
      .then((message: string) => setError(message));
  };
  const onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onsubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          {/* <input type="submit" value="Login" /> */}
          <button onClick={login}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
