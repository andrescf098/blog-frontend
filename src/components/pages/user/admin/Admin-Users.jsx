import { useEffect, useState } from "react";
import { global } from "../../../../helpers/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { statusCode } from "../../../../helpers/statusCode";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const URI = global.url + "user";
      const response = await fetch(URI, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const editUser = (id) => {
    navigate("/admin-panel/user?id=" + id);
  };
  const deleteUser = async (id) => {
    try {
      const URI = global.url + "user/" + id;
      const response = await fetch(URI, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (statusCode[response.status]) {
        setError(true);
      }
      getUsers();
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {error && (
        <div className="error-profile">
          <p>User can not be deleted</p>
        </div>
      )}
      <div className="userList">
        <table className="userList-table">
          <thead className="userList-table-head">
            <tr>
              <th>Name</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Options</th>
            </tr>
          </thead>
          {users.map((user, index) => {
            return (
              <tbody className="userList-table-body" key={index}>
                <tr>
                  <th>{user.name}</th>
                  <th>{user.lastname}</th>
                  <th>{user.email}</th>
                  <th>{user.role}</th>
                  <th>
                    <FontAwesomeIcon
                      className="userList-edit"
                      icon={faPen}
                      onClick={() => editUser(user._id)}
                    />
                    <FontAwesomeIcon
                      className="userList-delete"
                      icon={faTrash}
                      onClick={() => deleteUser(user._id)}
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

export default AdminUsers;
