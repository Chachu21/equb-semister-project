import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSideBar from "../components/admin/AdminSideBar";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
const AdminDashboard = () => {
  const isClicked = useSelector((state: RootState) => state.user.isClicked);
  console.log(isClicked);
  return (
    <div className="flex text-gray-800 font-inter relative">
      <AdminSideBar />
      <div
        className={`w-full relative flex flex-col flex-1 md:ml-64 bg-gray-200 min-h-screen transition-all ${
          isClicked ? "md:ml-0" : "md:w-[calc(100%-256px)]"
        }`}
      >
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
