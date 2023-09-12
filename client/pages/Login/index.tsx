import { http, localStorage } from "@/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type returnType = {
  token?: string;
  message?: string;
};

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = () => {
    http.post<returnType>("/api/login", { email, password }).then((data: returnType) => {
      if (data.message) {
        setError(data.message);
      }
      if (data.token) {
        localStorage.set("token", data.token);
      }
    });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
      <form onSubmit={onsubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div style={{ marginTop: 8 }}>
          <button onClick={login}>Login</button>
          <div style={{ marginTop: 4, fontSize: "0.8rem" }}>
            No account? <Link to="/register">Create one!</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
