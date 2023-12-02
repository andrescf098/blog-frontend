import { fetchHelper } from "../../helpers/fetchHelper";
import { global } from "../../helpers/global";
import "../../styles/home.css";
import { useEffect, useState } from "react";
import ListArticle from "./article/List-Article";
import NotFoundArticle from "./article/NotFound-Article";

const Home = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const URI = global.url + "articles";
    const { data } = await fetchHelper(URI, "GET");
    setArticles(data);
  };

  return (
    <div className="home">
      <div className="home-cards">
        {articles.length >= 1 ? (
          articles.map((article, index) => {
            return (
              <ListArticle
                key={index}
                id={article._id}
                date={article.createAt}
                title={article.title}
                description={article.description}
                image={article.image}
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
export default Home;
