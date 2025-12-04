import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "/login",   // ← No backend IP, clean & production-friendly
        { username, password }
      );
      setMsg("Login successful! Token: " + res.data.token);
    } catch (e) {
      setMsg("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      /><br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={loginUser}>Login</button>

      <p>{msg}</p>
    </div>
  );
}

export default Login;

