import React from "react";

interface Header {
  id: string;
  title: string;
}

interface UserGroupManageData {
  id: string;
  status: string;
  GroupName: string;
  GroupDuration: string;
  startedDate: string;
  CompletedDate: string;
  GroupSize: string;
  paymentMethod: string;
}

interface TableProps {
  header: Header[];
  userGroupManageData: UserGroupManageData[];
}

const UserGroupManageTables: React.FC<TableProps> = ({
  header,
  userGroupManageData,
}) => {
  const handleDelete = () => {
    console.log("Deleting");
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="">
            {header.map((item) => (
              <th
                key={item.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {item.title}
              </th>
            ))}
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userGroupManageData.map((data) => (
            <tr key={data.id} className="">
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    data.status === "completed"
                      ? "bg-green-500"
                      : data.status === "progress"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } mr-1`}
                ></span>
                <span className="text-sm">{data.status}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{data.GroupName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {data.GroupDuration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {data.startedDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {data.CompletedDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{data.GroupSize}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {data.paymentMethod}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserGroupManageTables;
``;