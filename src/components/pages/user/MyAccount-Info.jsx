import { useEffect, useState } from "react";
import { fetchHelper } from "../../../helpers/fetchHelper";
import { global } from "../../../helpers/global";
import { getIdFromToken } from "../../../helpers/sessionUtils";
import { statusCode } from "../../../helpers/statusCode";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const MyAccountInfo = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [block, setBlock] = useState(true);
  const [success, setSuccess] = useState(false);
  const [userChange, setUserChange] = useState({});
  const userId = getIdFromToken();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUser = async () => {
    const URI = global.url + "user/" + userId;
    const { data } = await fetchHelper(URI, "GET");
    setUser(data);
  };
  const nameChange = (e) => {
    setUserChange({ ...userChange, name: e.target.value });
    setBlock(false);
  };
  const lastnameChange = (e) => {
    setUserChange({ ...userChange, lastname: e.target.value });
    setBlock(false);
  };
  const emailChange = (e) => {
    setUserChange({ ...userChange, email: e.target.value });
    setBlock(false);
  };
  const passwordChange = (e) => {
    setUserChange({ ...userChange, password: e.target.value });
    setBlock(false);
  };
  const editAccount = async (e) => {
    e.preventDefault();
    setError(false);
    const URI = global.url + "user/" + userId;
    const response = await fetch(URI, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userChange),
    });
    if (statusCode[response.json().status]) {
      setError(true);
    } else {
      setSuccess(true);
      setSuccess(true);
      setTimeout(() => {
        navigate("/my-account");
        setSuccess(false);
      }, 5000);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {error && (
        <div className="error-profile">
          <p>Profile could not be edited</p>
        </div>
      )}
      {!success ? (
        <form className="myAccount-content">
          <h1>PROFILE</h1>
          <div className="myAccount-options-separator"></div>
          <div className="profile-inputs">
            <div className="profile-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name}
                onChange={nameChange}
              />
            </div>
            <div className="profile-group">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                name="lastname"
                defaultValue={user?.lastname}
                onChange={lastnameChange}
              />
            </div>
            <div className="profile-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                defaultValue={user?.email}
                onChange={emailChange}
              />
            </div>
            <div className="profile-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={passwordChange}
              />
            </div>
          </div>
          <input
            type="submit"
            value="Save changes"
            disabled={block ? true : false}
            onClick={editAccount}
          />
        </form>
      ) : (
        <div className="profile-success">
          <span className="profile-success-icon">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <h1>Success</h1>
          <p>Your account has been edit</p>
        </div>
      )}
    </>
  );
};

export default MyAccountInfo;
