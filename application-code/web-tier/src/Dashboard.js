// src/Dashboard.js
import React from "react";
import { logout } from "./helpers/auth";

function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome to Dashboard</h2>
      <button onClick={() => { logout(); window.location = "/"; }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;

