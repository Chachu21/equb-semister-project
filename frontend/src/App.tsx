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
import UserGroupDetailHistory from "./components/admin/UserGroupDetailHistory";
import Payment from "./components/payment/payment";
import Profile from "./components/admin/Profile";
import ResetPassword from "./Auth/ResetPassword";
// import ViewGroupDetails from "./components/UI/ViewGroupDetail";
import ViewGroupDetails from "./components/UI/ViewGroupDetail";
import UserDashboard from "./pages/UserDashboard";
import Main from "./components/UserDashboard/userContent/Main";
import UserTransaction from "./components/UserDashboard/UI/UserTransaction";
import Settings from "./components/UserDashboard/Settings";
import SendRequest from "./components/UserDashboard/UI/SendRequest";
import EqubCreatorDashboard from "./pages/EqubCreatorDashboard";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import Page404 from "./pages/404";
import DetailOfGroupType from "./components/UserDashboard/UI/DetailOfGroupType";
import ManageUserRequest from "./components/EqubCreatorDashboard/ManageUserRequest";
import EqubCreatorDashboardContent from "./components/EqubCreatorDashboard/EqubCreatorDashboardContent";
import NotificationComponent from "./components/admin/AdminNotification";

const App = () => {
  const role = useSelector((state: RootState) => state.user.user?.role);
  const user_id = useSelector((state: RootState) => state.user.user?._id);

  return (
    <div className=" ">
      {/* todo if looks not good remove max-w-[1920px] and above div */}
      <div className="">
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="/group" element={<Equb />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Page404 />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          {role === "admin" && (
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminContent />} />
              <Route path="/admin/manageuser" element={<UserManage />} />
              <Route path="/admin/transactions" element={<Transactions />} />
              <Route path="/admin/managegroups" element={<ManageGroups />} />
              <Route
                path="/admin/message"
                element={<NotificationComponent />}
              />
              <Route
                path="/admin/grouphistory"
                element={<UserGroupDetailHistory />}
              />
              <Route path="/admin/profile" element={<Profile />} />
              <Route
                path="/admin/group-details?"
                element={<ViewGroupDetails />}
              />
            </Route>
          )}
          {/* for user Dashboard */}
          {role === "user" && (
            <Route path="/userDashboard" element={<UserDashboard />}>
              <Route path="/userDashboard" index element={<Main />} />
              <Route path="/userDashboard/groups" element={<Equb />} />
              <Route
                path="/userDashboard/transactions"
                element={
                  <UserTransaction
                    urll={`http://localhost:5000/api/v1/payment/get/${user_id}`}
                    user_id={`${user_id}`}
                  />
                }
              />
              <Route path="/userDashboard/payment" element={<Payment />} />
              <Route path="/userDashboard/profile" element={<Profile />} />
              <Route path="/userDashboard/setting" element={<Settings />} />
              <Route
                path="/userDashboard/sendrequest"
                element={<SendRequest />}
              />
              <Route
                path="/userDashboard/statusdetailofgroup"
                element={<DetailOfGroupType />}
              />
            </Route>
          )}

          {/* for creator dashboard */}
          {role === "creator" && (
            <Route
              path="/equbCreatorDashboard"
              element={<EqubCreatorDashboard />}
            >
              <Route
                path="/equbCreatorDashboard"
                index
                element={<EqubCreatorDashboardContent />}
              />

              <Route
                path="/equbCreatorDashboard/manageGroups"
                element={<ManageGroups />}
              />
              <Route
                path="/equbCreatorDashboard/requests"
                element={<ManageUserRequest />}
              />
            </Route>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
