import UserContent from "../components/UserDashboard/userContent/UserContent";
import EqubCreatorSideBar from "../components/EqubCreatorDashboard/EqubCreatorSideBar";

const EqubCreatorDashboard = () => {
  return (
    <div className="flex min-h-[100vh] w-[100vw]">
      <EqubCreatorSideBar />
      <UserContent />
    </div>
  );
};

export default EqubCreatorDashboard;
