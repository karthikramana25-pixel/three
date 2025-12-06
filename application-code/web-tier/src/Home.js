import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 30 }}>
      <h2>Welcome to 3-Tier Web App</h2>

      <p>Please login to access your Dashboard.</p>

      <Link to="/login">
        <button style={{ marginRight: 10 }}>Login</button>
      </Link>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Home;

