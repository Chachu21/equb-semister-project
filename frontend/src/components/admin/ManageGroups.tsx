import { useState, useEffect } from "react";
import axios from "axios";
import ManageGroupTables from "../UI/ManageGroupTables";
import SearchUi from "../UI/SearchUi";

interface EqubGroup {
  id: string;
  types: string;
  name: string;
  members: number;
  amount: number;
  status: string;
}

const ManageGroups = () => {
  const [equbGroups, setEqubGroups] = useState<EqubGroup[]>([]);
  const [filteredGroup, setFilteredGroup] = useState<EqubGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Fetch data from your backend API endpoint
    axios
      .get("http://localhost:5000/api/v1/group")
      .then((response) => {
        setEqubGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const tableHead = [
    { id: "1", title: "ID" },
    { id: "2", title: "Types" },
    { id: "3", title: "GroupName" },
    { id: "4", title: "Members" },
    { id: "5", title: "Amount" },
    { id: "6", title: "Status" },
    { id: "7", title: "Actions" },
  ];

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults = equbGroups.filter((data) =>
      data.types.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroup(filteredResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage Equb Groups</h1>
      <SearchUi handleSearch={handleSearch} search={"period"} />
      <ManageGroupTables
        header={tableHead}
        equbGroups={filteredGroup.length > 0 ? filteredGroup : equbGroups}
      />
    </div>
  );
};

export default ManageGroups;
