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
      <div className="w-full">
        <div className="table-wrapper">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                {header.map((item) => (
                  <th
                    key={item.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {item.title}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userGroupManageData.map((data) => (
                <tr key={data.id}>
                  <td className="px-6 py-4">
                    <span
                      className={`h-2 w-2 rounded-full inline-block ${
                        data.status === "completed"
                          ? "bg-green-500"
                          : data.status === "progress"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } mr-1`}
                    ></span>{" "}
                    <span
                      className={`text-sm ${
                        data.status === "completed"
                          ? "text-green-600"
                          : data.status === "progress"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {data.status}
                    </span>{" "}
                  </td>
                  <td className="px-6 py-4">{data.GroupName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.GroupDuration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.startedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.CompletedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.GroupSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    {/* Action buttons */}
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
      </div>
    </div>
  );
};

export default UserGroupManageTables;