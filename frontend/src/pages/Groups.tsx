import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/EqubCard";
import { FaSearch } from "react-icons/fa";
import React from "react";

interface EqubType {
  _id: string;
  amount_of_deposit: number;
  equb_type_id: string;
  total_Members: number;
  status: string; // Assuming this property exists in your data
  createdAt: Date;
}

const Equb = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [equbType, setEqubType] = useState<EqubType[]>([]);
  const [queries, setQueries] = useState<{
    type?: string;
    amount?: number;
    members?: number;
  }>({});
  const [filteredData, setFilteredData] = useState<EqubType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/v1/groups/search`,
          {
            params: {
              ...queries,
              page: currentPage,
              pageSize: 8,
              sort: "-createdAt", // Sort by createdAt attribute in descending order
            },
          }
        );
        console.log(response.data);

        setEqubType(response.data.searchResult);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Failed to fetch equbType data:", error);
      }
    };

    fetchData();
  }, [currentPage, queries]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    try {
      const response = await axios.get(
        `http://localhost:5003/api/v1/groups/search`,
        {
          params: {
            ...queries,
            page: 1, // Always reset to page 1 when submitting the form
            pageSize: 9,
            sort: "-createdAt", // Sort by createdAt attribute in descending order
          },
        }
      );

      setFilteredData(response.data.searchResult);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Failed to fetch filtered data:", error);
    }
    setIsSearched(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col relative justify-center items-center space-y-2 m-auto sm:mx-[50px] pb-10">
      <div className="justify-center w-full z-0 bg-[#008B8B] items-center flex  flex-col space-y-10 py-5">
        <div className="text-center text-white font-bold text-[24px] ">
          Strengthening Collective Investing! Together, let's accumulate money.
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row  items-center justify-center gap-2"
        >
          <select
            id="type"
            name="type"
            value={queries.type || ""}
            onChange={(e) =>
              setQueries((prevState) => ({
                ...prevState,
                type: e.target.value,
              }))
            }
            className="bg-gray-100 outline-none border-2 border-gray-300 pl-3 w-full sm:w-[250px] h-10 rounded-[10px]  placeholder:text-[18px] leading-4 font-normal"
          >
            <option value="">Select equb type</option>
            <option value="64905b0bafe7ffbb048ac95f">Monthly</option>
            <option value="649b35dfa8e66ccd7073efd5">Weekly</option>
            <option value="64905af2afe7ffbb048ac95e">Daily</option>
          </select>

          <input
            id="amount"
            name="amount"
            value={queries.amount || ""}
            onChange={(e) =>
              setQueries((prevState) => ({
                ...prevState,
                amount: e.target.value ? parseInt(e.target.value) : undefined,
              }))
            }
            type="number"
            className="bg-gray-100 outline-none border-2 border-gray-300 pl-3 w-full sm:w-[250px] h-10 rounded-[10px]  placeholder:text-[18px] leading-4 font-normal"
            placeholder="amount of deposit"
          />

          <input
            id="members"
            name="members"
            value={queries.members || ""}
            onChange={(e) =>
              setQueries((prevState) => ({
                ...prevState,
                members: e.target.value ? parseInt(e.target.value) : undefined,
              }))
            }
            type="number"
            className="bg-gray-100 outline-none border-2 border-gray-300 pl-3 w-full sm:w-[250px] h-10  rounded-[10px] placeholder:text-[18px] leading-4 font-normal"
            placeholder="number of members"
          />

          <button
            type="submit"
            className="bg-blue-400 h-10 flex px-[14px] justify-center items-center rounded-[5px] cursor-pointer"
          >
            <FaSearch color="white" />
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3  gap-8 flex-wrap ">
        {filteredData.length > 0 ? (
          filteredData.map((equbItem) => (
            <Card
              key={equbItem._id}
              amount={equbItem.amount_of_deposit}
              equb_type_id={equbItem.equb_type_id}
              No_member={equbItem.total_Members}
              createdAt={equbItem.createdAt}
              equb_Group_id={equbItem._id}
            />
          ))
        ) : isSearched ? (
          <p>No result found</p>
        ) : (
          equbType.map((equbItem) => (
            <Card
              key={equbItem._id}
              amount={equbItem.amount_of_deposit}
              equb_type_id={equbItem.equb_type_id}
              No_member={equbItem.total_Members}
              createdAt={equbItem.createdAt}
              equb_Group_id={equbItem._id}
            />
          ))
        )}
      </div>
      <div className="flex justify-center py-12">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 mr-5 border ${
              index + 1 === currentPage
                ? "bg-[#008B8B] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Equb;