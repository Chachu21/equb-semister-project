import { useSelector } from "react-redux";
import UserDashboardMainCard from "../UI/UserDashboardMainCard";
import UserTransaction from "../UI/UserTransaction";
import { RootState } from "../../../Redux/store";
// import LuckIdentifier from "./LuckIdentifier";

const Main = () => {
  const user_id = useSelector((state: RootState) => state.user.user?._id);

  return (
    <div className="container justify-center mx-auto mt-3">
      <UserDashboardMainCard />
      <div className="">
        <div className="w-full">
          <UserTransaction
            urll={`http://localhost:5000/api/v1/payment/get/${user_id}`}
            user_id={`${user_id}`}
            isSearch={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
