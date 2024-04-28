import { useState, useEffect } from "react";
import axios from "axios";
import SearchUi from "../UI/SearchUi";
import Tables from "../UI/Tables";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";

interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const UserManage = () => {
  const [tableData, setTableData] = useState<UserData[]>([]);
  const [filteredUser, setFilteredUser] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const userData = useSelector((state: RootState) => state.user.user);

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<UserData[]>(
        "http://localhost:5000/api/v1/users"
      );
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Extract only necessary fields from tableData
  const filteredData = tableData.map(
    ({ _id, name, email, createdAt, updatedAt }) => ({
      _id,
      name,
      email,
      createdAt: formatDateString(createdAt),
      updatedAt: formatDateString(updatedAt),
    })
  );

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults = filteredData.filter((data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUser(filteredResults);
  };

  const handleDelete = async (userId: string) => {
    try {
      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.delete(
        `http://localhost:5000/api/v1/users/${userId}`,
        config
      );
      setTableData(tableData.filter((user) => user._id !== userId));
      setFilteredUser(filteredUser.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  // Other functions remain the same

  const tableHead = [
    { id: "1", title: "User ID" },
    { id: "2", title: "Name" },
    { id: "3", title: "Email" },
    { id: "4", title: "CREATED DATE" },
    { id: "5", title: "UPDATED DATE" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage users</h1>
      <SearchUi
        handleSearch={() => {
          handleSearch(searchTerm);
        }}
        search={"name"}
      />
      <Tables
        header={tableHead}
        datas={filteredUser.length > 0 ? filteredUser : filteredData}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserManage;
