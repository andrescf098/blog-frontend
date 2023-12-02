import { BrowserRouter } from "react-router-dom";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import AppRoutes from "./AppRoutes";
import { GlobalStateProvider } from "../context";

const App = () => {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Nav />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </GlobalStateProvider>
  );
};

export default App;
