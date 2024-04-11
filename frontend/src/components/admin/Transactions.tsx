import { useState } from "react";
import SearchUi from "../UI/SearchUi";
import Tables from "../UI/Tables";

interface Transaction {
  status: string;
  date: string;
  amount: string;
  type: string;
  paymentMethod: string;
  api: string;
  customer: string;
  paymentReference: string;
}

const Transactions = () => {
  const headers = {
    status: "Status",
    date: "Date",
    amount: "Amount",
    type: "Type",
    paymentMethod: "Payment Method",
    api: "API",
    customer: "Customer",
    paymentReference: "Payment Reference",
  };

  const transactions: Transaction[] = [
    {
      status: "Success",
      date: "2024-02-20",
      amount: "$100.00",
      type: "Payment",
      paymentMethod: "Credit Card",
      api: "Stripe",
      customer: "John Doe",
      paymentReference: "REF123456",
    },
    // Add more transactions as needed
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults = transactions.filter((transaction) =>
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filteredResults);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-5 mb-2">Transactions</h1>
      <SearchUi
        handleSearch={() => {
          handleSearch(searchTerm);
        }}
        search={"status"}
      />
      <Tables
        header={headers}
        data={
          filteredTransactions.length > 0 ? filteredTransactions : transactions
        }
      />
    </div>
  );
};

export default Transactions;
