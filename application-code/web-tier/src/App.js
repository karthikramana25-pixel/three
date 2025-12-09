import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { Burger, Menu } from "./components";
import FocusLock from "react-focus-lock";
import { useOnClickOutside } from "./hooks";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import DatabaseDemo from "./components/DatabaseDemo/DatabaseDemo";
import ProtectedRoute from "./ProtectedRoute";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { getToken } from "./helpers/auth";

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  // Check if logged in
  const token = getToken();

  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Router>
        {/* ---------------------------- */}
        {/* SHOW MENU ONLY AFTER LOGIN  */}
        {/* ---------------------------- */}
        {token && (
          <div ref={node}>
            <FocusLock disabled={!open}>
              <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
              <Menu open={open} setOpen={setOpen} id={menuId} />
            </FocusLock>
          </div>
        )}

        {/* ROUTES */}
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected pages */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/db"
            element={
              <ProtectedRoute>
                <DatabaseDemo />
              </ProtectedRoute>
            }
          />
        </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;

