import '../../styles/sidebar.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { global } from '../../helpers/global';
import { fetchHelper } from '../../helpers/fetchHelper';

const Sidebar = ({ userId }) => {
  const [user, setUser] = useState();

  const userInfo = async () => {
    try {
      const URI = global.url + 'user/' + userId;
      const { data } = await fetchHelper(URI, 'GET');
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userInfo();
  }, []);

  return (
    <div className='sidebar'>
      <section className='sidebar-user'>
        <div className='sidebar-user'>
          <img
            className='logo-user'
            src={`${
              user?.image == 'user.png'
                ? 'https://res.cloudinary.com/dvyvgkxvc/image/upload/fl_preserve_transparency/v1713312491/pngwing.com_ibhw4j.jpg?_s=public-apps'
                : user?.image
            }`}
            alt=''
          />
          <div>
            <h1>
              {user?.name} {user?.lastname}
            </h1>
            <h2>{user?.role === 'default' ? 'User' : 'Admin'}</h2>
          </div>
        </div>
      </section>
      <div className='sidebar-separator'></div>
      <section className='sidebar-cards'>
        {user?.articles?.map((article, index) => {
          return (
            <div key={index} className='card-container'>
              <img
                className='card-img'
                src={
                  !article?.image
                    ? 'https://www.blogdelfotografo.com/wp-content/uploads/2020/04/fotografo-paisajes.jpg'
                    : `${article.image}`
                }
                alt=''
              />
              <div className='card-content'>
                <div className='card-info'>
                  <h2>{article.title}</h2>
                  <h3>{article.createAt.split('T')[0]}</h3>
                </div>
                <img
                  className='logo-user'
                  src={`${
                    user?.image == 'user.png'
                      ? 'https://res.cloudinary.com/dvyvgkxvc/image/upload/fl_preserve_transparency/v1713312491/pngwing.com_ibhw4j.jpg?_s=public-apps'
                      : user?.image
                  }`}
                  alt=''
                />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
Sidebar.propTypes = {
  userId: PropTypes.string,
};
export default Sidebar;
