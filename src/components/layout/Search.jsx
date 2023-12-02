import { useContext, useEffect, useState } from "react";
import { global } from "../../helpers/global";
import { fetchHelper } from "../../helpers/fetchHelper";
import NotFoundArticle from "../pages/article/NotFound-Article";
import "../../styles/search.css";
import dateUtils from "../../helpers/date.utils";
import { GlobalStateContext } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const context = useContext(GlobalStateContext);
  const navigate = useNavigate();
  useEffect(() => {
    getArticles();
  }, [search]);
  const local = useLocation();
  const urlParams = new URLSearchParams(local.search);

  const getArticles = async () => {
    if (search.length >= 1) {
      const URI = global.url + "articles/find/" + search;
      const { data } = await fetchHelper(URI, "GET");
      setArticles(data);
    } else {
      const URI = global.url + "articles";
      const { data } = await fetchHelper(URI, "GET");
      setArticles(data);
    }
  };
  const view = (article) => {
    context.setViewArticle({
      userId: article.user,
      title: article.title,
      description: article.description,
      content: article.content,
      date: article.createAt,
    });
    context.setShowSearch(false);
    navigate("/article");
  };
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="search">
      <div className="search-input">
        <input
          type="text"
          defaultValue={urlParams.get("search")}
          onChange={searchHandler}
        />
        {search.length >= 1 && (
          <p className="search-view">
            Searching {`" `}
            {search}
            {` "`}
          </p>
        )}
      </div>
      <div className="search-separator"></div>
      <div className="search-cards">
        {articles.length >= 1 ? (
          articles.map((article, index) => {
            return (
              <div key={index} className="search-card">
                <div className="search-card-date">
                  <p>
                    {article.createAt
                      ? dateUtils.getDayFromData(article.createAt)
                      : ""}
                  </p>
                  <p>
                    {article.createAt
                      ? dateUtils?.getMonthFromData(article.createAt)
                      : ""}
                  </p>
                </div>
                <img
                  className="search-card-img"
                  src="https://www.blogdelfotografo.com/wp-content/uploads/2020/04/fotografo-paisajes.jpg"
                  alt=""
                />
                <div className="search-card-content">
                  <div className="search-card-info">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                  </div>
                  <button className="btn-card" onClick={() => view(article)}>
                    Read more
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <NotFoundArticle />
        )}
      </div>
    </div>
  );
};
export default Search;
