import { http } from "@/utils";
import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    http.post("/login", { username, password });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // const params = new URLSearchParams();
    // params.append("username", username);
    // params.append("password", password);
    // fetch("/login", {
    //   method: "POST",
    //   body: params,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.redirected) {
    //       window.location.href = res.url;
    //     }
    //   })
    //   .catch((error) => console.log(error));
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
        <div>
          {/* <input type="submit" value="Login" /> */}
          <button onClick={login}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
