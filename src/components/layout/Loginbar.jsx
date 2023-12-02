import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/login-bar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faPenToSquare,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { GlobalStateContext } from "../../context";

const LoginBar = () => {
  const context = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    context.setShowLoginBar(false);
    context.setLogin(false);
    navigate("/login");
  };
  const logoutAdmin = () => {
    localStorage.removeItem("token");
    context.setShowLoginBar(false);
    context.setLogin(false);
    context.setAdmin(false);
    navigate("/login");
  };
  return (
    <div className="login-bar">
      {!context.login && (
        <ul>
          <li>
            <NavLink to="/login" onClick={() => context.setShowLoginBar(false)}>
              <span>
                <FontAwesomeIcon icon={faCircleUser} />
              </span>
              Login
            </NavLink>
          </li>
          <div className="login-bar-separator"></div>
          <li>
            <NavLink
              to="/sign-up"
              onClick={() => context.setShowLoginBar(false)}
            >
              <span>
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
              Sign up
            </NavLink>
          </li>
        </ul>
      )}
      {context.login && !context.admin && (
        <ul>
          <li>
            <NavLink to="/my-account">My Account</NavLink>
          </li>
          <div className="login-bar-separator"></div>
          <li>
            <p onClick={logout}>
              <span>
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
              Log out
            </p>
          </li>
        </ul>
      )}
      {context.login && context.admin && (
        <ul>
          <li>
            <NavLink to="/admin-panel">
              <span>
                <FontAwesomeIcon icon={faSliders} />
              </span>{" "}
              Admin panel
            </NavLink>
          </li>
          <div className="login-bar-separator"></div>
          <li>
            <p onClick={logoutAdmin}>
              <span>
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
              Log out
            </p>
          </li>
        </ul>
      )}
    </div>
  );
};
export default LoginBar;
