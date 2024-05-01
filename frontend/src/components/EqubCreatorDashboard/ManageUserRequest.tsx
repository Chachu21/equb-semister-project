import { useState, useEffect } from "react";
import axios from "axios";
import SearchUi from "../UI/SearchUi";
import Tables from "../UI/Tables";

interface UserRequest {
  _id: string;
  equbType: string;
  equbTypeLength: number;
  amount: number;
  numMembers: number;
  createdAt: string;
}

const ManageUserRequest = () => {
  const [tableData, setTableData] = useState<UserRequest[]>([]);
  const [filteredUserRequest, setFilteredUserRequest] = useState<UserRequest[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<UserRequest[]>(
        "http://localhost:5000/api/v1/request/get"
      );
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Extract only necessary fields from tableData
  const filteredData = tableData.map(
    ({ _id, equbType, equbTypeLength, amount, numMembers, createdAt }) => ({
      _id,
      equbType,
      equbTypeLength,
      amount,
      numMembers,
      createdAt: formatDateString(createdAt),
    })
  );

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults = filteredData.filter((data) =>
      data.equbType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUserRequest(filteredResults);
  };

  const handleDelete = async (requestId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/request/delete/${requestId}`
      );
      setTableData(tableData.filter((request) => request._id !== requestId));
      setFilteredUserRequest(
        filteredUserRequest.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const tableHead = [
    { id: "1", title: "Request ID" },
    { id: "2", title: "Equb Type" },
    { id: "3", title: "Equb Type Length" },
    { id: "4", title: "Amount" },
    { id: "5", title: "Num Of Members" },
    { id: "6", title: "Created DATE" },
  ];

  return (
    <div className="flex flex-col container space-y-5">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage User Requests</h1>
      <SearchUi
        handleSearch={() => {
          handleSearch(searchTerm);
        }}
        search={"equb type"}
      />
      <Tables
        header={tableHead}
        datas={
          filteredUserRequest.length > 0 ? filteredUserRequest : filteredData
        }
        onDelete={handleDelete}
        hasDelete={true}
      />
    </div>
  );
};

export default ManageUserRequest;
