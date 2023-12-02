import { global } from "../../helpers/global";
import { fetchHelper } from "../../helpers/fetchHelper";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../context";
import { NavLink, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [articles, setArticles] = useState([]);
  const context = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const searchArticle = async () => {
    if (context.searchData.length > 0) {
      const URI =
        global.url + "articles/find/" + context.searchData + "?limit=4";
      const { data } = await fetchHelper(URI, "GET");
      setArticles(data);
    }
  };
  const view = (article) => {
    context.setViewArticle({
      userId: article.user._id,
      title: article.title,
      description: article.description,
      content: article.content,
      date: article.createAt,
    });
    context.setShowSearch((current) => !current);
    navigate("/article");
  };
  useEffect(() => {
    searchArticle();
  }, [context.searchData]);

  return (
    <>
      {context.searchData.length !== 0 && (
        <div className="searchbar-container">
          {articles?.map((article, index) => (
            <div
              key={index}
              className="searchbar-content"
              onClick={() => view(article)}
            >
              <div className="card-search">
                <h1>{article?.title}</h1>
                <p>{article?.createAt.split("T")[0]}</p>
              </div>
            </div>
          ))}
          <div className="searchbar-separator"></div>
          <div className="searchbar-showmore">
            <NavLink
              to={`/search?search=${context.searchData}`}
              onClick={() => context.setShowSearch((current) => !current)}
            >
              Show more
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
