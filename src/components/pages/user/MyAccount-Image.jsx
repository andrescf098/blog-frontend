import { useEffect, useState } from "react";
import { getIdFromToken } from "../../../helpers/sessionUtils";
import { fetchHelper } from "../../../helpers/fetchHelper";
import { global } from "../../../helpers/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { statusCode } from "../../../helpers/statusCode";

const MyAccountImage = () => {
  const [user, setUser] = useState({});
  const [block, setBlock] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const userId = getIdFromToken();

  const editAccount = async (e) => {
    e.preventDefault();
    const fileInput = document.querySelector("#file");
    const formData = new FormData();
    formData.append("file0", fileInput.files[0]);
    const response = await fetch(global.url + "image/user/" + user._id, {
      method: "POST",
      body: formData,
    });
    if (statusCode[response.status]) {
      setError(true);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate("/my-account");
        setSuccess(false);
      }, 5000);
    }
  };
  const getUser = async () => {
    const URI = global.url + "user/" + userId;
    const { data } = await fetchHelper(URI, "GET");
    setUser(data);
  };
  const imageChange = () => {
    setBlock(false);
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
          <h1>PROFILE IMAGE</h1>
          <div className="myAccount-options-separator"></div>
          <img
            className="myAccount-img"
            src={`${global.url}image/${user.image}`}
            alt=""
          />
          <div className="profile-inputs">
            <div className="profile-image">
              <input
                type="file"
                name="file0"
                id="file"
                onChange={imageChange}
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
          <p>Your profile image has been changed</p>
        </div>
      )}
    </>
  );
};

export default MyAccountImage;
