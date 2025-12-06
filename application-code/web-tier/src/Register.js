import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");

  const registerUser = async () => {
    try {
      await axios.post("/api/register", { username: u, password: p });
      setMsg("Registration success! Please login.");
    } catch {
      setMsg("User already exists.");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Register</h2>

      <input placeholder="Username" onChange={(e) => setU(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password"
        onChange={(e) => setP(e.target.value)} />
      <br /><br />

      <button onClick={registerUser}>Register</button>

      <p>{msg}</p>
    </div>
  );
}

export default Register;

