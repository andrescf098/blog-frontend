import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/notfound.css";

const NotFoundArticle = () => {
  return (
    <div className="notfound">
      <div className="notfound-container">
        <span className="notfound-icon">
          <FontAwesomeIcon icon={faBan} />
        </span>
        <h1>Not found</h1>
        <p>Articles not found</p>
      </div>
    </div>
  );
};

export default NotFoundArticle;
