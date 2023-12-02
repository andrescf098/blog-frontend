import { faImage, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";
import "../../../styles/adminPanel.css";

const AdminPanel = () => {
  return (
    <div className="myAccount">
      <section className="myAccount-options">
        <h1>ADMIN PANEL</h1>
        <div className="myAccount-options-separator"></div>
        <ul>
          <li>
            <NavLink to="/admin-panel/users">
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-panel/articles">
              <span>
                <FontAwesomeIcon icon={faImage} />
              </span>
              Articles
            </NavLink>
          </li>
        </ul>
      </section>
      <section className="myAccount-container">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminPanel;
