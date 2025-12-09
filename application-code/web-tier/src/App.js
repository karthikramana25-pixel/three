// ==========================
// App.js (Final Working Version)
// ==========================

import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useOnClickOutside } from "./hooks";
import { GlobalStyles } from "./global";
import { theme } from "./theme";

import { Burger, Menu } from "./components";
import FocusLock from "react-focus-lock";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

// NEW — DB Page
import DatabaseDemo from "./components/DatabaseDemo/DatabaseDemo";

// HashRouter works perfectly with Nginx + Kubernetes + HTTPS
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  // Close burger menu when clicking outside
  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <div ref={node}>
        <FocusLock disabled={!open}>

          {/* Hamburger Menu */}
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />

          <Router>
            {/* Side Menu */}
            <Menu open={open} setOpen={setOpen} id={menuId} />

            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* DATABASE DEMO PAGE */}
              <Route path="/db" element={<DatabaseDemo />} />

              {/* PROTECTED ROUTES */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>

        </FocusLock>
      </div>
    </ThemeProvider>
  );
}

export default App;

