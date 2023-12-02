import Home from "../components/pages/Home";
import Create from "../components/pages/article/Create-article";
import Edit from "../components/pages/article/Edit-article";
import MyArticles from "../components/pages/article/My-Articles";
import ChangePassword from "../components/pages/Change-password";
import Login from "../components/pages/Login";
import MyAccount from "../components/pages/user/MyAccount";
import PasswordRecovery from "../components/pages/Password-recovery";
import Register from "../components/pages/Register";
import AdminPanel from "../components/pages/user/Admin-Panel";

class AppRoutesProtect {
  #response(condition, route1, route2) {
    if (condition) {
      return route1;
    } else {
      return route2;
    }
  }

  login(context) {
    return this.#response(context.login, <Home />, <Login />);
  }
  register(context) {
    return this.#response(context.login, <Home />, <Register />);
  }
  myArticle(context) {
    return this.#response(context.login, <MyArticles />, <Home />);
  }
  createArticle(context) {
    return this.#response(context.login, <Create />, <Home />);
  }
  editArticle(context) {
    return this.#response(context.login, <Edit />, <Home />);
  }
  recoveryPassword(context) {
    return this.#response(context.login, <Home />, <PasswordRecovery />);
  }
  changePassword(context) {
    return this.#response(context.login, <Home />, <ChangePassword />);
  }
  myAccount(context) {
    return this.#response(
      context.login,
      <MyAccount />,

      <Home />
    );
  }
  adminPanel(context) {
    return this.#response(
      context.login && context.admin,
      <AdminPanel />,
      <Home />
    );
  }
}

export default AppRoutesProtect;
