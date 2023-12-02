import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { statusCode } from "../../../helpers/statusCode";
import { global } from "../../../helpers/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { fetchHelper } from "../../../helpers/fetchHelper";

const Edit = () => {
  const [articleEdit, setArticleEdit] = useState({});
  const [article, setArticle] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [blockButton, setBlockButton] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const local = useLocation();
  const urlParams = new URLSearchParams(local.search);

  const getArticle = async () => {
    const URI = global.url + "articles/article/" + urlParams.get("id");
    const { data } = await fetchHelper(URI, "GET");
    setArticle(data);
  };

  const editArticle = async (e) => {
    e.preventDefault();
    setError(false);
    if (article) {
      const URI = global.url + "articles/article/" + urlParams.get("id");
      const response = await fetch(URI, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleEdit),
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
    } else {
      const fileInput = document.querySelector("#file");
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);
      await fetch(global.url + "image/" + urlParams.get("id"), {
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
  useEffect(() => {
    getArticle();
  }, []);

  const titleChange = (e) => {
    setArticleEdit({ ...articleEdit, title: e.target.value });
    setBlockButton(false);
  };
  const descriptionChange = (e) => {
    setArticleEdit({ ...articleEdit, description: e.target.defaultValue });
    setBlockButton(false);
  };
  const contentChange = (e) => {
    setArticleEdit({ ...articleEdit, content: e.target.defaultValue });
    setBlockButton(false);
  };
  const imageChange = () => {
    setBlockButton(false);
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
          <h1>EDIT ARTICLE</h1>
          <div className="create-separator"></div>
          <form className="create-content">
            <div className="create-form-group">
              <label htmlFor="title">Title of article</label>
              <input
                type="text"
                name="title"
                defaultValue={article.title}
                placeholder="Title"
                onChange={titleChange}
              />
            </div>
            <div className="create-form-group">
              <label htmlFor="description">Description of article</label>
              <input
                type="text"
                name="description"
                defaultValue={article.description}
                placeholder="Description"
                onChange={descriptionChange}
              />
            </div>
            <div className="create-form-group">
              <label htmlFor="file0">Upload image</label>
              <input
                type="file"
                name="file0"
                id="file"
                onChange={imageChange}
                defaultValue={article.image}
              />
            </div>
            <div className="create-form-group">
              <label htmlFor="content">Content of article</label>
              <textarea
                name="content"
                cols="30"
                rows="10"
                defaultValue={article.content}
                onChange={contentChange}
              ></textarea>
            </div>
            <input
              className="create-btn"
              type="submit"
              value="Edit"
              disabled={blockButton ? true : false}
              onClick={editArticle}
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
          <p>Your article are edited</p>
        </div>
      )}
    </div>
  );
};
export default Edit;
