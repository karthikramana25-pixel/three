import React, { useState } from "react";
import axios from "axios";
import { saveToken } from "./helpers/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const loginUser = async () => {
    try {
      const res = await axios.post("/api/login", {
        username: u,
        password: p,
      });

      // Save token to localStorage
      saveToken(res.data.token);

      // Redirect to dashboard
      nav("/dashboard");
    } catch (err) {
      setMsg("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setU(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setP(e.target.value)}
      />
      <br /><br />

      <button onClick={loginUser}>Login</button>

      <p>{msg}</p>
    </div>
  );
}

export default Login;

