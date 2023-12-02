import Home from "../components/pages/Home";
import Article from "../components/pages/article/Article";
import { useRoutes } from "react-router-dom";
import NotFound from "../components/pages/NotFound";
import useLoginVerification from "../helpers/loginVerification";
import { useContext } from "react";
import { GlobalStateContext } from "../context";
import AppRoutesProtect from "./AppRoutesProtect";
import Search from "../components/layout/Search";
import MyAccountInfo from "../components/pages/user/MyAccount-Info";
import MyAccountImage from "../components/pages/user/MyAccount-Image";
import AdminUsers from "../components/pages/user/admin/Admin-Users";
import AdminArticles from "../components/pages/article/admin/Admin-Articles";
import AdminUser from "../components/pages/user/admin/Admin-user";
import AdminArticle from "../components/pages/article/admin/Admin-article";

const AppRoutes = () => {
  const protect = new AppRoutesProtect();
  const context = useContext(GlobalStateContext);
  useLoginVerification();

  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "article",
      element: <Article />,
    },
    {
      path: "create",
      element: protect.createArticle(context),
    },
    {
      path: "edit",
      element: protect.editArticle(context),
    },
    {
      path: "my-articles",
      element: protect.myArticle(context),
    },
    {
      path: "login",
      element: protect.login(context),
    },
    {
      path: "sign-up",
      element: protect.register(context),
    },
    {
      path: "recovery-password",
      element: protect.recoveryPassword(context),
    },
    {
      path: "change-password",
      element: protect.changePassword(context),
    },
    {
      path: "admin-panel",
      element: protect.adminPanel(context),
      children: [
        {
          path: "users",
          element: <AdminUsers />,
        },
        {
          path: "user",
          element: <AdminUser />,
        },
        {
          path: "articles",
          element: <AdminArticles />,
        },
        {
          path: "article",
          element: <AdminArticle />,
        },
      ],
    },
    {
      path: "my-account",
      element: protect.myAccount(context),
      children: [
        {
          path: "info",
          element: <MyAccountInfo />,
        },
        {
          path: "image",
          element: <MyAccountImage />,
        },
      ],
    },
    {
      path: "search",
      element: <Search />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routes;
};
export default AppRoutes;
