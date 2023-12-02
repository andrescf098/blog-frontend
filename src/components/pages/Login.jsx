import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { fetchHelper } from "../../helpers/fetchHelper";
import { global } from "../../helpers/global";
import { useContext, useState } from "react";
import { GlobalStateContext } from "../../context";
import { statusCode } from "../../helpers/statusCode";

const Login = () => {
  const [loginBody, setLoginBody] = useState({
    email: "",
    password: "",
  });
  const context = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    context.setErrorLogin(false);
    try {
      const URI = global.url + "auth/login";
      const { data } = await fetchHelper(URI, "POST", loginBody);
      if (statusCode[data.statusCode]) {
        context.setErrorLogin(true);
      } else {
        localStorage.setItem("token", data.token);
        context.setShowLoginBar(false);
        context.setErrorLogin(false);
        context.setLogin(true);
        navigate("/");
      }
    } catch (error) {
      context.setErrorLogin(true);
    }
  };
  const changedEmail = (e) => {
    setLoginBody({ ...loginBody, email: e.target.value });
  };
  const changedPassword = (e) => {
    setLoginBody({ ...loginBody, password: e.target.value });
  };
  const refresh = () => {
    context.setErrorLogin(false);
    context.setShowLoginBar(false);
  };

  return (
    <div className="login">
      {context.errorLogin && (
        <div className="login-error">
          <p>Invalid email or password</p>
        </div>
      )}
      <div className="login-container">
        <h1>LOGIN</h1>
        <div className="login-separator"></div>
        <form className="login-form" onSubmit={loginHandler}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={changedEmail}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={changedPassword}
          />
          <NavLink to="/recovery-password" onClick={refresh}>
            Forgot your password?
          </NavLink>
          <input
            type="submit"
            name="signIn"
            value="Sign in"
            className="btn-login"
          />
        </form>
      </div>
      <p>
        Do not have an account?{" "}
        <NavLink to="/sign-up" onClick={() => context.setShowLoginBar(false)}>
          Sign up
        </NavLink>
      </p>
    </div>
  );
};
export default Login;
