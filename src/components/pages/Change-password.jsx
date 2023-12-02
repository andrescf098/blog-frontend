import { useContext, useState } from "react";
import { GlobalStateContext } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { fetchHelper } from "../../helpers/fetchHelper";
import { global } from "../../helpers/global";
import { useLocation, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const context = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const local = useLocation();
  const urlParams = new URLSearchParams(local.search);

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    setErrorPassword(false);
    setError(false);
    if (e.target.password.value !== e.target.confirmPassword.value) {
      setErrorPassword(true);
    } else {
      try {
        const body = {
          newPassword: e.target.password.value,
          token: urlParams.get("token"),
        };
        const URI = global.url + "auth/change-password";
        await fetchHelper(URI, "POST", body);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/login");
        }, 8000);
      } catch (error) {
        setError(true);
      }
    }
  };
  return (
    <div className="login">
      {error && (
        <div className="login-error">
          <p>Password must have a minimum of 8 characters</p>
        </div>
      )}
      {errorPassword && (
        <div className="login-error">
          <p>Password and Confirm password have to that equal</p>
        </div>
      )}
      {!success ? (
        <div className="login-container">
          <h1>CHANGE PASSWORD</h1>
          <div className="login-separator"></div>
          <form className="login-form" onSubmit={changePasswordHandler}>
            <label className="lb-info" name="email">
              Enter your new password
            </label>
            <input type="password" name="password" placeholder="Password" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <input
              type="submit"
              name="signIn"
              value="Change password"
              className="btn-login"
              onClick={() => context.setShowLoginBar(false)}
            />
          </form>
        </div>
      ) : (
        <div className="recovery-success">
          <span className="recovery-success-icon">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <h1>Success</h1>
          <p>Your password was changed</p>
        </div>
      )}
    </div>
  );
};
export default ChangePassword;
