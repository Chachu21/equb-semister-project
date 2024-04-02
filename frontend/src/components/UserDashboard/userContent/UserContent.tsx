import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";

const UserContent = () => {
  const isClicked = useSelector((state: RootState) => state.user.isClicked);

  return (
    <div
      className={`w-full relative flex flex-col flex-1 bg-gray-200 min-h-screen transition-all  ${
        isClicked ? "md:ml-0" : "md:w-[calc(100%-256px)]  md:ml-64"
      }`}
    >
      <UserHeader />
      <Outlet />
    </div>
  );
};

export default UserContent;
