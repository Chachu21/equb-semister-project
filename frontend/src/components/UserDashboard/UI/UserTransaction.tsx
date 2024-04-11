import { useEffect, useState } from "react";
import { transactionsType } from "../../../types/transaction";
import axios from "axios";
import Tables from "../../UI/Tables";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

const transactionHeader = {
  _id: "id",
  fname: "fname",
  lname: "lname",
  user: "User id",
  email: "email ",
  equbGroup: "group id",
  amount: "amount",
  currency: "currency",
  status: "status",
  reference: "reference",
  tx_ref: "tx_ref",
  verified_at: "Verified At",
};

const UserTransaction = () => {
  const [transaction, setTransaction] = useState<transactionsType[]>([]);
  const user_id = useSelector((state: RootState) => state.user.user?._id);
  useEffect(() => {
    const fetchTransaction = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/payment/get/${user_id}`
      );
      setTransaction(response.data);
    };
    fetchTransaction();
  }, [user_id]);

  return (
    <div className="mt-20 container">
      <Tables header={transactionHeader} data={transaction} />
    </div>
  );
};

export default UserTransaction;
