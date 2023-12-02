import { NavLink } from "react-router-dom";
import "../../styles/login-bar.css";
import { useContext } from "react";
import { GlobalStateContext } from "../../context";

const NavDropdown = () => {
  const context = useContext(GlobalStateContext);

  return (
    <div className="navbar-dropdown">
      <div className="logo-dropdown">
        <p>PERSONAL BLOG</p>
      </div>
      <div className="navbar-dropdown-separator"></div>
      <ul>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setShowNavbar((current) => !current)}
          >
            Home
          </NavLink>
        </li>

        {context.login && (
          <>
            <li>
              <NavLink
                to="/my-articles"
                onClick={() => context.setShowNavbar((current) => !current)}
              >
                My articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                onClick={() => context.setShowNavbar((current) => !current)}
              >
                Create article
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default NavDropdown;
