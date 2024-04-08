import React, { useState, useEffect } from "react";
import SearchUi from "../UI/SearchUi";
import UserGroupManageTables from "../UI/UserGroupManageTables";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface Header {
  id: string;
  title: string;
}

interface UserGroupManageData {
  _id: string;
  status: string;
  name: string;
  types: string;
  startDate: string;
  completedDate: string;
  member: string;
  amount: string;
}

const UserGroupDetailHistory: React.FC = () => {
  const header: Header[] = [
    { id: "1", title: "Status" },
    { id: "2", title: "GroupName" },
    { id: "3", title: "GroupDuration" },
    { id: "4", title: "startedDate" },
    { id: "5", title: "CompletedDate" },
    { id: "6", title: "GroupSize" },
    { id: "7", title: "Amount" },
    { id: "8", title: "Action" },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUserGroup, setFilteredUsergroup] = useState<
    UserGroupManageData[]
  >([]);
  const [userGroups, setUserGroups] = useState<UserGroupManageData[]>([]);
  const userData: any = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const userId = userData?._id; // Replace with the actual user ID
        const response = await axios.get<UserGroupManageData[]>(
          `http://localhost:5000/api/v1/group/userJoinedGroups/${userId}`
        );
        setUserGroups(response.data);
      } catch (error) {
        console.error("Error fetching user's joined groups:", error);
      }
    };

    fetchUserGroups();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults = userGroups.filter((data) =>
      data.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsergroup(filteredResults);
  };

  const handleDelete = () => {
    console.log("Deleting");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-5 mb-2">
        UserGroupDetailHistory
      </h1>
      <SearchUi handleSearch={handleSearch} search={"status"} />
      <Tables
        header={header}
        userGroupManageData={
          filteredUserGroup.length > 0 ? filteredUserGroup : userGroups
        }
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default UserGroupDetailHistory;
