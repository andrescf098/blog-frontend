import { useContext, useState } from "react";
import { GlobalStateContext } from "../../context";
import { global } from "../../helpers/global";
import { fetchHelper } from "../../helpers/fetchHelper";
import { useNavigate } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/recovery.css";

const PasswordRecovery = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const context = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const recoveryHandler = async (e) => {
    e.preventDefault();
    try {
      const URI = global.url + "auth/recovery";
      await fetchHelper(URI, "POST", {
        email: e.target.email.value,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 8000);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="login">
      {error && (
        <div className="login-error">
          <p>Email not found</p>
        </div>
      )}
      {!success ? (
        <div className="login-container">
          <h1>RECOVERY PASSWORD</h1>
          <div className="login-separator"></div>
          <form className="login-form" onSubmit={recoveryHandler}>
            <label className="lb-info" name="email">
              Enter your registerd email to reset your password
            </label>
            <input type="text" name="email" placeholder="Email" />
            <input
              type="submit"
              name="signIn"
              value="Send email"
              className="btn-login"
              onClick={() => context.setShowLoginBar(false)}
            />
          </form>
        </div>
      ) : (
        <div className="recovery-success">
          <span className="recovery-success-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <h1>Success</h1>
          <p>Check your email</p>
        </div>
      )}
    </div>
  );
};
export default PasswordRecovery;
