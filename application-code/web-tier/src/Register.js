import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    const res = await axios.post("/register", {
      username,
      password,
    });
    alert("User registered!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;

