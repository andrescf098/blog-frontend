import Sidebar from '../../layout/Sidebar';
import '../../../styles/article.css';
import { useEffect, useState } from 'react';
import { global } from '../../../helpers/global';
import { useLocation } from 'react-router-dom';
import { fetchHelper } from '../../../helpers/fetchHelper';

const Article = () => {
  const [article, setArticle] = useState({});
  const [userId, setUseId] = useState('');
  const local = useLocation();
  const urlParams = new URLSearchParams(local.search);

  useEffect(() => {
    const getArticle = async () => {
      const URI = global.url + 'articles/article/' + urlParams.get('id');
      const { data } = await fetchHelper(URI, 'GET');
      setArticle(data);
      setUseId(data.user._id);
      console.log(data.user._id);
    };
    getArticle();
  }, []);
  return (
    <div className='article-container'>
      {userId?.length > 0 && <Sidebar userId={userId} />}
      <article className='article'>
        <section className='article-header'>
          <h1>{article?.title}</h1>
          <h2>{article?.description}</h2>
          <h3>{article.createAt?.split('T')[0]}</h3>
        </section>
        <div className='article-separator'></div>
        <section className='article-body'>
          <img
            src={
              !article?.image
                ? 'https://www.blogdelfotografo.com/wp-content/uploads/2020/04/fotografo-paisajes.jpg'
                : `${article.image}`
            }
            alt=''
          />
          <p>{article.content}</p>
        </section>
      </article>
    </div>
  );
};
export default Article;
