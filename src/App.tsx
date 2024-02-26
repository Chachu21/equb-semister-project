import { Routes, Route } from "react-router-dom";
import Equb from "./pages/Groups";
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./route/Root";


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
        </Route>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminContent />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
