import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [showLoginBar, setShowLoginBar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [viewArticle, setViewArticle] = useState({});
  const [searchData, setSearchData] = useState("");
  return (
    <GlobalStateContext.Provider
      value={{
        login,
        setLogin,
        admin,
        setAdmin,
        showLoginBar,
        setShowLoginBar,
        showSearch,
        setShowSearch,
        showNavbar,
        setShowNavbar,
        errorLogin,
        setErrorLogin,
        viewArticle,
        setViewArticle,
        searchData,
        setSearchData,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

GlobalStateProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
