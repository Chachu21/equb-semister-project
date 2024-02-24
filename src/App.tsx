import { Routes, Route } from "react-router-dom";
import Equb from "./pages/Groups";
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./route/Root";
import React from "react";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";




 const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/group" element={<Equb />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>
      </Routes>

      <div>
        {/* <Register />
        <Login />
        <ForgotPassword /> */}
      </div>
    </div>
  );
};

export default App;;


