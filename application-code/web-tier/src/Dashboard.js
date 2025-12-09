import React from "react";
import DatabaseDemo from "./components/DatabaseDemo/DatabaseDemo";
import { logout } from "./helpers/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // remove token
    navigate("/");     // go to home
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Dashboard</h2>

      <button 
        onClick={handleLogout}
        style={{
          float: "right",
          background: "#d9534f",
          color: "white",
          padding: "8px 16px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          marginBottom: "20px"
        }}
      >
        Logout
      </button>

      <DatabaseDemo />
    </div>
  );
}

export default Dashboard;

