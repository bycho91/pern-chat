import { Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import PrivateRoutes from "./PrivateRoutes";

const Views = () => {
  const { user } = useContext(AccountContext);
  return (
    <>
      {user.loggedIn === null ? (
        <Text>Loading...</Text>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Text>Hi Welcome</Text>} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default Views;
