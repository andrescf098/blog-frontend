import { useEffect, useState } from "react";
import { fetchHelper } from "../../../../helpers/fetchHelper";
import { global } from "../../../../helpers/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  const navigator = useNavigate();
  const getArticles = async () => {
    try {
      const URI = global.url + "articles";
      const { data } = await fetchHelper(URI, "GET");
      setArticles(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const editArticle = (id) => {
    navigator(`/admin-panel/article?id=${id}`);
  };
  const deleteArticle = async (id) => {
    try {
      const URI = global.url + "articles/admin/" + id;
      await fetch(URI, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getArticles();
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {error && (
        <div className="error-profile">
          <p>Article can not be deleted</p>
        </div>
      )}
      <div className="userList">
        <table className="userList-table">
          <thead className="userList-table-head">
            <tr>
              <th>User</th>
              <th>Title</th>
              <th>Date</th>
              <th>Options</th>
            </tr>
          </thead>
          {articles?.map((article, index) => {
            return (
              <tbody className="userList-table-body" key={index}>
                <tr>
                  <th>{article?.user}</th>
                  <th>{article?.title}</th>
                  <th>{article?.createAt}</th>
                  <th>
                    <FontAwesomeIcon
                      className="userList-edit"
                      icon={faPen}
                      onClick={() => editArticle(article._id)}
                    />
                    <FontAwesomeIcon
                      className="userList-delete"
                      icon={faTrash}
                      onClick={() => deleteArticle(article._id)}
                    />
                  </th>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default AdminArticles;
