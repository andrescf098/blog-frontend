import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/register.css";
import { useContext, useState } from "react";
import { global } from "../../helpers/global";
import { fetchHelper } from "../../helpers/fetchHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { GlobalStateContext } from "../../context";
import { statusCode } from "../../helpers/statusCode";

const Register = () => {
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [registerBody, setRegisterBody] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [passwordVerification, setPasswordVerification] = useState({
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const context = useContext(GlobalStateContext);

  const registerHandler = async (e) => {
    e.preventDefault();
    setError(false);
    setInternalError(false);
    setErrorPassword(false);
    if (
      passwordVerification.password === passwordVerification.confirmPassword
    ) {
      if (registerBody.password.length >= 8) {
        try {
          const URI = global.url + "user";
          const { data } = await fetchHelper(URI, "POST", registerBody);
          if (statusCode[data.statusCode]) {
            setInternalError(true);
          } else {
            setSuccess(true);
            setTimeout(() => {
              navigate("/");
              setSuccess(false);
            }, 5000);
          }
        } catch (error) {
          setInternalError(true);
        }
      } else {
        setErrorPassword(true);
      }
    } else {
      setError(true);
    }
  };
  const changedName = (e) => {
    setRegisterBody({ ...registerBody, name: e.target.value });
  };
  const changedLastname = (e) => {
    setRegisterBody({ ...registerBody, lastname: e.target.value });
  };
  const changedEmail = (e) => {
    setRegisterBody({ ...registerBody, email: e.target.value });
  };
  const changedPassword = (e) => {
    setRegisterBody({ ...registerBody, password: e.target.value });
    setPasswordVerification({
      ...passwordVerification,
      password: e.target.value,
    });
  };
  const changedConfirmPassword = (e) => {
    setRegisterBody({ ...registerBody, password: e.target.value });
    setPasswordVerification({
      ...passwordVerification,
      confirmPassword: e.target.value,
    });
  };
  return (
    <div className="signup">
      {errorPassword && (
        <div className="signup-error">
          <p>Password must have a minimum of 8 characters</p>
        </div>
      )}
      {error && (
        <div className="signup-error">
          <p>Password and Confirm password have to that equal</p>
        </div>
      )}
      {internalError && (
        <div className="signup-error">
          <p>Internal error</p>
        </div>
      )}
      {!success && (
        <>
          <div className="signup-container">
            <h1>SIGN UP</h1>
            <div className="signup-separator"></div>
            <form className="signup-form" onSubmit={registerHandler}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={changedName}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                onChange={changedLastname}
              />
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
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={changedConfirmPassword}
              />
              <input
                type="submit"
                name="signUp"
                value="Register"
                className="btn-signup"
              />
            </form>
          </div>
          <p>
            Do you have an account?{" "}
            <NavLink to="/login" onClick={() => context.setShowLoginBar(false)}>
              Sign in
            </NavLink>
          </p>
        </>
      )}
      {success && (
        <div className="signup-success">
          <span className="signup-success-icon">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <h1>Success</h1>
          <p>Your account has been created succesfully</p>
        </div>
      )}
    </div>
  );
};
export default Register;
