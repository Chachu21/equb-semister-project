import { Routes, Route } from "react-router-dom";
import Equb from "./pages/Groups";
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./route/Root";
import ForgotPassword from "./Auth/ForgotPassword";
import Login from "./Auth/Login";
import Register from "./Auth/Register";


const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/group" element={<Equb />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Equb />} />
          <Route path="/register" element={<About />} />
        </Route>
      </Routes>

      <div>
        
        {/* <Register />
        <Login />
        <ForgotPassword /> */}
        
      </div>
    </div>
  );;
};

export default App;;


