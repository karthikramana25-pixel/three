import React, { useState } from "react";
import axios from "axios";
import "./ui.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const registerUser = async () => {
    try {
      await axios.post("/api/register", { username: u, password: p });
      setMsg("✅ Registration successful! Redirecting to login...");
      setTimeout(() => nav("/"), 1200);
    } catch {
      setMsg("❌ User already exists");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h2>Create Account</h2>

        <input
          className="input-box"
          placeholder="Choose Username"
          onChange={(e) => setU(e.target.value)}
        />

        <input
          className="input-box"
          type="password"
          placeholder="Choose Password"
          onChange={(e) => setP(e.target.value)}
        />

        <button className="btn" onClick={registerUser}>
          Register
        </button>

        {msg && <p style={{ marginTop: "10px" }}>{msg}</p>}

        <p style={{ marginTop: "15px" }}>
          Already registered?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => nav("/")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

