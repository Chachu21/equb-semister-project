import { useEffect, useState } from "react";
import { transactionsType } from "../../../types/transaction";
import axios from "axios";
import Tables from "../../UI/Tables";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

const transactionHeader = [
  { id: "1", title: "id" },
  { id: "2", title: "fname" },
  { id: "3", title: "lname" },
  { id: "4", title: "User id" },
  { id: "5", title: "email" },
  { id: "6", title: "group id" },
  { id: "7", title: "round" },
  { id: "8", title: "amount" },
  { id: "9", title: "currency" },
  { id: "10", title: "reference" },
  { id: "11", title: "tx_ref" },
  { id: "12", title: "verified At" },
];

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
      <Tables
        header={transactionHeader}
        datas={transaction}
        onDelete={() => {}}
      />
    </div>
  );
};

export default UserTransaction;
