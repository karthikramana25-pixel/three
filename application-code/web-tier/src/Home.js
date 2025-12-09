import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Welcome</h2>

      <p>
        <Link to="/login">Login</Link>
      </p>

      <p>
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Home;

