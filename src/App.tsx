import { Routes, Route } from "react-router-dom";
import Equb from "./pages/Groups";
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./route/Root";



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


