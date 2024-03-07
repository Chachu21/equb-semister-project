import React from "react";

interface Header {
  id: string;
  title: string;
}

interface TransactionData {
  id: string;
  status: string;
  date: string;
  amount: string;
  type: string;
  paymentMethod: string;
  api: string;
  customer: string;
  paymentReference: string;
}

interface TableProps {
  header: Header[];
  transactionData: TransactionData[];
}

const TransactionTables: React.FC<TableProps> = ({
  header,
  transactionData,
}) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {header.map((item) => (
                <th
                  key={item.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactionData.map((data) => (
              <tr key={data.id}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      data.status === "Success"
                        ? "bg-green-500"
                        : data.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></span>{" "}
                  <span
                    className={`text-sm ${
                      data.status === "Success"
                        ? "text-green-600"
                        : data.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {data.status}
                  </span>{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{data.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{data.api}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data.paymentReference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTables;
