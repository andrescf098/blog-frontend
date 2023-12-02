import { useEffect, useState } from "react";
import { global } from "../../../helpers/global";
import { fetchHelper } from "../../../helpers/fetchHelper";
import ListArticle from "./List-Article";
import NotFoundArticle from "./NotFound-Article";
import { getIdFromToken } from "../../../helpers/sessionUtils";

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const id = getIdFromToken();
    const URI = global.url + "user/" + id;
    const { data } = await fetchHelper(URI, "GET");
    setArticles(data.articles);
  };

  return (
    <div className="home">
      <div className="home-cards">
        {articles?.length >= 1 ? (
          articles.map((article, index) => {
            return (
              <ListArticle
                key={index}
                userId={article.user}
                id={article._id}
                date={article.createAt}
                title={article.title}
                description={article.description}
                image={article.image}
                content={article.content}
                edit={true}
              />
            );
          })
        ) : (
          <NotFoundArticle />
        )}
      </div>
    </div>
  );
};

export default MyArticles;
