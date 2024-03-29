import { useState } from "react";
import SearchUi from "../UI/SearchUi";
import TransactionTables from "../UI/TransactionTables";

const Transactions = () => {
  const header = [
    { id: "1", title: "Status" },
    { id: "2", title: "Date" },
    { id: "3", title: "Amount" },
    { id: "4", title: "Type" },
    { id: "5", title: "Payment Method" },
    { id: "6", title: "API" },
    { id: "7", title: "Customer" },
    { id: "8", title: "Payment Reference" },
  ];

  const transactions = [
    {
      id: "1",
      status: "Success",
      date: "2024-02-20",
      amount: "$100.00",
      type: "Payment",
      paymentMethod: "Credit Card",
      api: "Stripe",
      customer: "John Doe",
      paymentReference: "REF123456",
    },
    {
      id: "2",
      status: "Pending",
      date: "2024-02-21",
      amount: "$50.00",
      type: "Refund",
      paymentMethod: "PayPal",
      api: "PayPal API",
      customer: "Jane Smith",
      paymentReference: "REF987654",
    },
    {
      id: "3",
      status: "Failed",
      date: "2024-02-22",
      amount: "$75.00",
      type: "Payment",
      paymentMethod: "Debit Card",
      api: "Square",
      customer: "Alice Johnson",
      paymentReference: "REF246810",
    },
    {
      id: "4",
      status: "Success",
      date: "2024-02-23",
      amount: "$120.00",
      type: "Payment",
      paymentMethod: "Bank Transfer",
      api: "TransferWise",
      customer: "Bob Brown",
      paymentReference: "REF135792",
    },
    {
      id: "5",
      status: "Pending",
      date: "2024-02-24",
      amount: "$200.00",
      type: "Refund",
      paymentMethod: "Credit Card",
      api: "Stripe",
      customer: "Emily Davis",
      paymentReference: "REF246802",
    },
    {
      id: "6",
      status: "Success",
      date: "2024-02-25",
      amount: "$90.00",
      type: "Payment",
      paymentMethod: "PayPal",
      api: "PayPal API",
      customer: "Michael Wilson",
      paymentReference: "REF135798",
    },
    {
      id: "7",
      status: "Pending",
      date: "2024-02-26",
      amount: "$150.00",
      type: "Payment",
      paymentMethod: "Credit Card",
      api: "Stripe",
      customer: "Sophia Martinez",
      paymentReference: "REF975318",
    },
    {
      id: "8",
      status: "Failed",
      date: "2024-02-27",
      amount: "$180.00",
      type: "Refund",
      paymentMethod: "Bank Transfer",
      api: "TransferWise",
      customer: "Olivia Rodriguez",
      paymentReference: "REF642790",
    },
    {
      id: "9",
      status: "Success",
      date: "2024-02-28",
      amount: "$80.00",
      type: "Payment",
      paymentMethod: "Debit Card",
      api: "Square",
      customer: "William Garcia",
      paymentReference: "REF753024",
    },
    {
      id: "10",
      status: "Pending",
      date: "2024-02-29",
      amount: "$95.00",
      type: "Payment",
      paymentMethod: "Credit Card",
      api: "Stripe",
      customer: "Isabella Smith",
      paymentReference: "REF468025",
    },
    // Add more transactions as needed
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults: any = transactions.filter((transaction) =>
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filteredResults);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-5 mb-2">Transactions</h1>
      <SearchUi handleSearch={handleSearch} search={"status"} />
      <TransactionTables
        header={header}
        transactionData={
          filteredTransactions.length > 0 ? filteredTransactions : transactions
        }
      />
    </div>
  );
};

export default Transactions;
