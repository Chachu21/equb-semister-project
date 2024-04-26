import { Routes, Route } from "react-router-dom";
import Equb from "./pages/Groups";
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./route/Root";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContent from "./components/admin/AdminContent";
import UserManage from "./components/admin/UserManage";
import Transactions from "./components/admin/Transactions";
import ManageGroups from "./components/admin/ManageGroups";
import AccountDetail from "./components/admin/AccountDetail";
import UserGroupDetailHistory from "./components/admin/UserGroupDetailHistory";
import CreateGroup from "./components/UserDashboard/CreateGroup";
import Payment from "./components/payment/payment";
import Profile from "./components/admin/Profile";
import ResetPassword from "./Auth/ResetPassword";
import ViewGroupDetails from "./components/UI/ViewGroupDetail";
// import ViewGroupDetails from "./components/UI/ViewGroupDetail";
import UserDashboard from "./pages/UserDashboard";
import Main from "./components/UserDashboard/userContent/main";
import UserTransaction from "./components/UserDashboard/UI/UserTransaction";
import Settings from "./components/UserDashboard/Settings";
import SendRequest from "./components/UserDashboard/UI/SendRequest";
import EqubCreatorDashboard from "./pages/EqubCreatorDashboard";
// import Pay from "./components/payment/pay";

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
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminContent />} />
          <Route path="/admin/manageuser" element={<UserManage />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/managegroups" element={<ManageGroups />} />
          {/* <Route path="/admin/pay" element={<Pay />} /> */}

          <Route
            path="/admin/grouphistory"
            element={<UserGroupDetailHistory />}
          />

          {/* <Route path="/admin/profile" element={<Profile />} /> */}
          <Route path="/admin/accountdetail" element={<AccountDetail />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/managegroups" element={<ManageGroups />} />
          <Route path="/admin//group-details" element={<ViewGroupDetails />} />
        </Route>
        {/* for user Dashboard */}
        <Route path="/userDashboard" element={<UserDashboard />}>
          <Route path="/userDashboard" index element={<Main />} />
          <Route path="/userDashboard/groups" element={<Equb />} />
          <Route path="/userDashboard/create" element={<CreateGroup />} />
          <Route path="/userDashboard/userRequest" element={<SendRequest />} />

          <Route
            path="/userDashboard/transactions"
            element={<UserTransaction />}
          />
          <Route path="/userDashboard/payment" element={<Payment />} />
          {/* <Route path="/userDashboard/pay" element={<Pay />} /> */}
          <Route path="/userDashboard/profile" element={<Profile />} />
          <Route path="/userDashboard/setting" element={<Settings />} />
        </Route>
        <Route path="/userDashboard" element={<UserDashboard />}>
          <Route path="/userDashboard" index element={<Equb />} />
          <Route path="/userDashboard/create" element={<CreateGroup />} />
          <Route
            path="/userDashboard/transactions"
            element={<UserTransaction />}
          />
          <Route path="/userDashboard/payment" element={<Payment />} />
          {/* <Route path="/userDashboard/pay" element={<Pay />} /> */}
          <Route path="/userDashboard/profile" element={<Profile />} />
          <Route path="/userDashboard/setting" element={<AccountDetail />} />
        </Route>
        <Route path="/equbCreatorDashboard" element={<EqubCreatorDashboard />}>
          <Route
            path="/equbCreatorDashboard/create"
            index
            element={<CreateGroup />}
          />
          <Route
            path="/equbCreatorDashboard/manageGroups"
            element={<ManageGroups />}
          />
        </Route>
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default App;
