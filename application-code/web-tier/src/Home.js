import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveToken } from "./helpers/auth";
import "./ui.css";

function Home() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const loginUser = async () => {
    try {
      const res = await axios.post("/api/login", { username: u, password: p });
      saveToken(res.data.token);
      nav("/dashboard");
    } catch {
      setMsg("❌ Invalid username or password");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h2>Login</h2>

        <input
          className="input-box"
          placeholder="Username"
          onChange={(e) => setU(e.target.value)}
        />

        <input
          className="input-box"
          type="password"
          placeholder="Password"
          onChange={(e) => setP(e.target.value)}
        />

        <button className="btn" onClick={loginUser}>
          Login
        </button>

        {msg && <p style={{ color: "red", marginTop: "10px" }}>{msg}</p>}

        <p style={{ marginTop: "15px" }}>
          New user?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => nav("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;

