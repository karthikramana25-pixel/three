import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components';
import FocusLock from 'react-focus-lock';

import DatabaseDemo from './components/DatabaseDemo/DatabaseDemo';
import Home from './components/Home/Home';
import Register from "./Register";
import Login from "./Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <div ref={node}>
        <FocusLock disabled={!open}>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />

          <Router>
            <Menu open={open} setOpen={setOpen} id={menuId} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/db" element={<DatabaseDemo />} />
	      <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </FocusLock>
      </div>
    </ThemeProvider>
  );
}

export default App;

