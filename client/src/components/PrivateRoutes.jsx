import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const { Navigate, Outlet } = require("react-router-dom");

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;