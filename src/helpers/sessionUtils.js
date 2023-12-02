import * as jose from "jose";
export const loginVerficiation = (context) => {
  const token = localStorage.getItem("token");
  if (token) {
    context.setLogin(true);
  } else {
    context.setLogin(false);
  }
};
export const adminVerificator = (context) => {
  try {
    let token = localStorage.getItem("token");
    let role = jose.decodeJwt(token).role;
    if (role === "admin") {
      context.setAdmin(true);
    } else {
      context.setAdmin(false);
    }
  } catch (error) {
    context.setAdmin(false);
  }
};
export const getIdFromToken = () => {
  try {
    let token = localStorage.getItem("token");
    let id = jose.decodeJwt(token).sub;
    return id;
  } catch (error) {
    console.error(error);
  }
};
export default { loginVerficiation, adminVerificator };
