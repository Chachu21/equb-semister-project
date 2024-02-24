import DashboardView from "../components/dashboard/dasboard/adminDashboard/DashboardView";
import SideBar from "../components/dashboard/dasboard/adminDashboard/SideBar";

const AdminDashboard = () => {
  return (
    <div className="text-gray-800 font-inter">
      <SideBar />
      <DashboardView />
    </div>
  );
};

export default AdminDashboard;
