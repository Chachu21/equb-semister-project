import { Routes, Route } from "react-router-dom";
import Equb from "./pages/Groups";
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./route/Root";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./components/admin/Profile";
import AdminContent from "./components/admin/AdminContent";
import UserManage from "./components/admin/UserManage";
import Transactions from "./components/admin/Transactions";
import ManageGroups from "./components/admin/ManageGroups";
import UserGroupDetailHistory from "./components/admin/UserGroupDetailHistory";



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
          <Route path="/admin/manageuser" element={<UserManage />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/managegroups" element={<ManageGroups />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route
            path="/admin/grouphistory"
            element={<UserGroupDetailHistory />}
          />
        </Route>
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default App;
