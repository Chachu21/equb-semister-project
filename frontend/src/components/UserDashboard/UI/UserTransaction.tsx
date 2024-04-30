import { useEffect, useState } from "react";
import { transactionsType } from "../../../types/transaction";
import axios from "axios";
import Tables from "../../UI/Tables";

const transactionHeader = [
  { id: "1", title: "id" },
  { id: "2", title: "Fname" },
  { id: "3", title: "Lname" },
  { id: "4", title: "email" },
  { id: "5", title: "userId" },
  { id: "6", title: "group id" },
  { id: "7", title: "round" },
  { id: "8", title: "status" },
  { id: "9", title: "amount" },
  { id: "10", title: "currency" },
  { id: "12", title: "reference" },
  { id: "13", title: "tx_ref" },
  { id: "14", title: "verifiedAt" },
];
interface endpoint {
  urll: string;
  user_id: string;
}

const UserTransaction = ({ urll, user_id }: endpoint) => {
  const hasDEleteAction = false;
  const [transaction, setTransaction] = useState<transactionsType[]>([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(urll);

        const filteredProperties = [
          "_id",
          "fname",
          "lname",
          "email",
          "user",
          "equbGroup",
          "round",
          "status",
          "amount",
          "currency",
          "reference",
          "tx_ref",
          "verified_at",
        ];

        // Extract only the required properties from the response data
        const filteredTransactionData = response.data.map(
          (transaction: { [key: string]: any }) => {
            const filteredTransaction: { [key: string]: any } = {}; // Type explicit declaration
            filteredProperties.forEach((property: string) => {
              if (transaction.hasOwnProperty(property)) {
                filteredTransaction[property.toUpperCase()] =
                  transaction[property];
              }
            });
            return filteredTransaction;
          }
        );

        // Set the filtered transaction data
        setTransaction(filteredTransactionData);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    if (user_id) {
      fetchTransaction();
    }
  }, [user_id, urll]);

  return (
    <div className="container justify-center mx-auto mt-3">
      <div className="">
        <Tables
          header={transactionHeader}
          datas={transaction}
          hasDelete={hasDEleteAction} // Pass the boolean prop indicating delete button visibility
          onDelete={() => {}}
        />
      </div>
    </div>
  );
};

export default UserTransaction;
