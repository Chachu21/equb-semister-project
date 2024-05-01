import EqubCreatorSideBar from "../components/EqubCreatorDashboard/EqubCreatorSideBar";
import CreatorHeader from "../components/EqubCreatorDashboard/CreatorHeader";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const EqubCreatorDashboard = () => {
  const isClicked = useSelector((state: RootState) => state.user.isClicked);

  return (
    <div className="flex min-h-[100vh] w-[100vw]">
      <EqubCreatorSideBar />
      <div
        className={`w-full relative flex flex-col flex-1 bg-gray-200 min-h-screen transition-all ${
          isClicked ? "md:ml-0" : "md:w-[calc(100%-256px)]  md:ml-64"
        }`}
      >
        <CreatorHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default EqubCreatorDashboard;
