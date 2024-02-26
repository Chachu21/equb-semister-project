import React, { useState } from "react";
import ManageGroupTables from "./dasboard/adminDashboard/UI/ManageGroupTables";
import SearchUi from "./dasboard/adminDashboard/UI/SearchUi";


const ManageGroups = ({  }) => {
  // Dummy data for equb groups
  const EqubGroups = [
    {
      id: "1",
      period: "Weekly",
      groupName: "derashEqub",
      members: 5,
      amount: 1000,
      status: "Approved",
    },
    {
      id: "2",
      period: "Daily",
      groupName: "fetanEqub",
      members: 8,
      amount: 1500,
      status: "Pending",
    },
    {
      id: "3",
      period: "Monthly",
      groupName: "yegnaEqub",
      members: 10,
      amount: 2000,
      status: "Approved",
    },
    {
      id: "4",
      period: "5 days",
      groupName: "FriendsEqub",
      members: 10,
      amount: 2000,
      status: "Approved",
    },
    {
      id: "5",
      period: "Yearly",
      groupName: "MullerEqub",
      members: 10,
      amount: 2000,
      status: "Approved",
    },
  ];

  const tableHead = [
    { id: "1", title: "ID" },
    { id: "2", title: "Period" },
    { id: "3", title: "GroupName" },
    { id: "4", title: "Members" },
    { id: "5", title: "Amount" },
    { id: "6", title: "Status" },
    { id: "7", title: "Actions" },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredGroup, setFilteredGroup] = useState([]);

 const handleSearch = (searchTerm: string) => {
   console.log("Search term:", searchTerm); // Log the search term
   setSearchTerm(searchTerm);
   const filteredResults: any = EqubGroups.filter((data) =>
     data.period.toLowerCase().includes(searchTerm.toLowerCase())
   );
   console.log("Filtered results:", filteredResults); // Log the filtered results
   setFilteredGroup(filteredResults);
 };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage Equb Groups</h1>
      <SearchUi handleSearch={handleSearch} search={"period"} />
      <ManageGroupTables
        header={tableHead}
        equbGroups={filteredGroup.length > 0 ? filteredGroup : EqubGroups}
      />
    </div>
  );
};

export default ManageGroups;
