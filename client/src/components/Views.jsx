import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Login/Signup";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
