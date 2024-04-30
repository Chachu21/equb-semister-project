import { useState, useEffect } from "react";
import axios from "axios";
import SearchUi from "../UI/SearchUi";
import Tables from "../UI/Tables";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import CreateGroup from "../UserDashboard/CreateGroup";

interface EqubGroup {
  _id: string;
  types: string;
  name: string;
  member: number;
  amount: number;
  status: string;
}

const ManageGroups = () => {
  const [equbGroups, setEqubGroups] = useState<EqubGroup[]>([]);
  const [filteredGroup, setFilteredGroup] = useState<EqubGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const userData = useSelector((state: RootState) => state.user.user);
  // const user_id = userData?._id;
  // const token = userData?.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/group/getAll"
        );
        setEqubGroups(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Extract only necessary fields from tableData
  const filteredData = equbGroups.map(
    ({ _id, types, name, member, amount, status }) => ({
      _id,
      types,
      name,
      member,
      amount,
      status,
    })
  );

  const tableHead = [
    { id: "1", title: "ID" },
    { id: "2", title: "Types" },
    { id: "3", title: "GroupName" },
    { id: "4", title: "Member" },
    { id: "5", title: "Amount" },
    { id: "6", title: "Status" },
  ];

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filteredResults = filteredData.filter((data) =>
      data.types.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroup(filteredResults);
  };

  const handleDelete = async (groupId: string) => {
    try {
      // console.log("groupId is", groupId);

      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.delete(
        `http://localhost:5000/api/v1/group/delete/${groupId}`,
        config
      );
      // If successful, call the parent component handler to update the state
      // onGroupDeleted(groupToDelete!);
      console.log("Group deleted successfully");
      setEqubGroups(equbGroups.filter((group) => group._id !== groupId));
      setFilteredGroup(filteredGroup.filter((group) => group._id !== groupId));
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage Equb Groups</h1>
      <div className="flex justify-between items-center my-4">
        <SearchUi
          handleSearch={() => {
            handleSearch(searchTerm);
          }}
          search={"period"}
        />
        <div>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="w-fit px-[1.5px] md:px-3 py-2 md:py-[2px] rounded-md items-center text-center text-white bg-[#008B8B]"
          >
            add group
          </button>
          <CreateGroup
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
            }}
          />
        </div>
      </div>
      <Tables
        header={tableHead}
        datas={filteredGroup.length > 0 ? filteredGroup : filteredData}
        onDelete={handleDelete}
        hasDelete={true}
      />
    </div>
  );
};

export default ManageGroups;
