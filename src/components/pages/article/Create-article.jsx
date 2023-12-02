import { useState } from "react";
import "../../../styles/create.css";
import { getIdFromToken } from "../../../helpers/sessionUtils";
import { global } from "../../../helpers/global";
import { statusCode } from "../../../helpers/statusCode";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Create = () => {
  const [article, setArticle] = useState({
    user: "",
    title: "",
    description: "",
    content: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const createArticle = async (e) => {
    e.preventDefault();
    const userId = getIdFromToken();
    setError(false);
    setArticle({
      ...article,
      user: userId,
    });
    const URI = global.url + "articles";
    const response = await fetch(URI, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    const data = await response.json();
    if (statusCode[response.status]) {
      setError(true);
    } else {
      const fileInput = document.querySelector("#file");
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);
      await fetch(global.url + "image/" + data._id, {
        method: "POST",
        body: formData,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/my-articles");
        setSuccess(false);
      }, 5000);
    }
  };

  const titleChange = (e) => {
    setArticle({ ...article, title: e.target.value });
  };
  const descriptionChange = (e) => {
    setArticle({ ...article, description: e.target.value });
  };
  const contentChange = (e) => {
    setArticle({ ...article, content: e.target.value });
  };
  return (
    <div className="create">
      {error && (
        <div className="create-error">
          <p>Invalid article</p>
        </div>
      )}
      {!success && (
        <div className="create-container">
          <h1>Create article</h1>
          <div className="create-separator"></div>
          <form className="create-content">
            <div className="create-form-group">
              <label htmlFor="title">Title of article</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={titleChange}
              />
            </div>
            <div className="create-form-group">
              <label htmlFor="description">Description of article</label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                onChange={descriptionChange}
              />
            </div>
            <div className="create-form-group">
              <label htmlFor="file0">Upload image</label>
              <input type="file" name="file0" id="file" />
            </div>
            <div className="create-form-group">
              <label htmlFor="content">Content of article</label>
              <textarea
                name="content"
                cols="30"
                rows="10"
                onChange={contentChange}
              ></textarea>
            </div>
            <input
              className="create-btn"
              type="submit"
              value="Create"
              onClick={createArticle}
            />
          </form>
        </div>
      )}
      {success && (
        <div className="create-success">
          <span className="create-success-icon">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <h1>Success</h1>
          <p>Your article are created</p>
        </div>
      )}
    </div>
  );
};
export default Create;
