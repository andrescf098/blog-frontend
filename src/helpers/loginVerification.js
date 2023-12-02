import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../context";
import { adminVerificator, loginVerficiation } from "./sessionUtils";

const useLoginVerification = () => {
  const context = useContext(GlobalStateContext);

  useEffect(() => {
    loginVerficiation(context);
  }, []);

  useEffect(() => {
    loginVerficiation(context);
    adminVerificator(context);
  }, [context.login, context.admin]);
};
export default useLoginVerification;
