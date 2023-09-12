import { http } from "@/utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const register = () => {
    http
      .post<string>("/api/register", { firstName, lastName, email, password })
      .then((message: string) => setError(message));
  };
  const login = () => {
    navigate("/login");
  };
  const onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Register</h1>
      <form onSubmit={onsubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
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
          <button onClick={register}>Register</button>
          <button style={{ marginLeft: 8 }} onClick={login}>
            Go to login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
