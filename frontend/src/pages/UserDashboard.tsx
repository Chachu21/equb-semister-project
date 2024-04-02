import UserSideBar from "../components/UserDashboard/UserSideBar";
import UserContent from "../components/UserDashboard/userContent/UserContent";

const UserDashboard = () => {
  return (
    <div className="flex min-h-[100vh] w-[100vw]">
      <UserSideBar />
      <UserContent />
    </div>
  );
};

export default UserDashboard;
