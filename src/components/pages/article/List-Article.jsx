import PropTypes from "prop-types";
import dateUtils from "../../../helpers/date.utils";
import { useNavigate } from "react-router-dom";
import { global } from "../../../helpers/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListArticle = ({
  id,
  date,
  title,
  description,
  image = "",
  edit = false,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const view = () => {
    navigate(`/article?id=${id}`);
  };
  const deleteHandler = async () => {
    const URI = global.url + "articles/article/" + id;
    await fetch(URI, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload(true);
  };
  const editHandler = () => {
    navigate(`/edit?id=${id}`);
  };

  return (
    <div className="home-card">
      <div className="home-card-date">
        <p>{date ? dateUtils.getDayFromData(date) : ""}</p>
        <p>{date ? dateUtils?.getMonthFromData(date) : ""}</p>
      </div>
      {edit === true && (
        <div className="home-card-options">
          <div className="home-card-edit">
            <p>
              <FontAwesomeIcon icon={faPen} onClick={editHandler} />
            </p>
          </div>
          <div className="home-card-delete" onClick={deleteHandler}>
            <p>
              <FontAwesomeIcon icon={faTrash} />
            </p>
          </div>
        </div>
      )}
      <img
        className="home-card-img"
        src={
          !image
            ? "https://www.blogdelfotografo.com/wp-content/uploads/2020/04/fotografo-paisajes.jpg"
            : `${global.url}image/${image}`
        }
        alt=""
      />
      <div className="home-card-content">
        <div className="home-card-info">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="btn-card" onClick={view}>
          Read more
        </button>
      </div>
    </div>
  );
};

ListArticle.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  edit: PropTypes.bool,
};

export default ListArticle;
