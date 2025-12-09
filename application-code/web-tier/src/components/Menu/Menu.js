import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../../helpers/auth";

const Menu = ({ open, setOpen, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const navigate = useNavigate();

  const token = getToken(); // check if user logged in

  const handleLogout = () => {
    logout();      // remove token
    setOpen(false);
    navigate("/"); // redirect to home
  };

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <div>
        <nav>
          <ul>

            {/* HOME */}
            <li>
              <Link
                to="/"
                tabIndex={tabIndex}
                style={{ outline: "none", border: "none" }}
                onClick={() => setOpen(false)}
              >
                <div style={{ paddingBottom: "2em", float: "left" }}>
                  <span aria-hidden="true">🏠</span> Home
                </div>
              </Link>
            </li>

            {/* If NOT logged in → Show Register + Login */}
            {!token && (
              <>
                <li>
                  <Link
                    to="/login"
                    tabIndex={tabIndex}
                    style={{ outline: "none" }}
                    onClick={() => setOpen(false)}
                  >
                    <div style={{ paddingBottom: "2em", float: "left" }}>
                      🔐 Login
                    </div>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    tabIndex={tabIndex}
                    style={{ outline: "none" }}
                    onClick={() => setOpen(false)}
                  >
                    <div style={{ paddingBottom: "2em", float: "left" }}>
                      📝 Register
                    </div>
                  </Link>
                </li>
              </>
            )}

            {/* If logged in → Show DB Demo + Logout */}
            {token && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    tabIndex={tabIndex}
                    style={{ outline: "none" }}
                    onClick={() => setOpen(false)}
                  >
                    <div style={{ paddingBottom: "2em", float: "left" }}>
                      📊 Dashboard (DB Demo)
                    </div>
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    tabIndex={tabIndex}
                    style={{
                      outline: "none",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      paddingBottom: "2em",
                      float: "left",
                      fontSize: "1em"
                    }}
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </nav>
      </div>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;

