import UserTransaction from "../UserDashboard/UI/UserTransaction";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const Transactions = () => {
  const user_id = useSelector((state: RootState) => state.user.user?._id);

  return (
    <div className="container flex flex-col space-y-5 mt-10">
      <h1 className="text-2xl font-semibold ml-5 mb-2">
        manage users transaction{" "}
      </h1>
      <UserTransaction
        urll="http://localhost:5000/api/v1/payment/get"
        user_id={`${user_id}`}
        isSearch={true}
      />
    </div>
  );
};

export default Transactions;
