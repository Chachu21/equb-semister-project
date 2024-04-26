import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/EqubCard";
import { FaSearch } from "react-icons/fa";
import React from "react";

interface EqubType {
  _id: string;
  name: string;
  amount: number;
  types: string;
  member: number;
  status: string; // Assuming this property exists in your data
  createdOn: Date;
}

const Equb = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [equbType, setEqubType] = useState<EqubType[]>([]);
  const [queries, setQueries] = useState<{
    types?: string;
    amount?: number;
    member?: number;
  }>({});
  const [filteredData, setFilteredData] = useState<EqubType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/group/get`,
          {
            params: {
              ...queries,
              page: currentPage,
              pageSize: 10,
            },
          }
        );
        console.log(response.data.searchResult);
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
        `http://localhost:5000/api/v1/group/get`,
        {
          params: {
            ...queries,
            page: 1, // Always reset to page 1 when submitting the form
            pageSize: 10,
            // sort: "-createdAt", // Sort by createdAt attribute in descending order
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
    <div className="container mx-auto flex flex-col relative justify-center items-center space-y-2 pb-10">
      <div className="justify-center w-full z-0 bg-[#008B8B] items-center flex  flex-col space-y-10 py-5">
        <div className="text-center text-white font-bold text-[24px] ">
          Strengthening Collective Investing! Together, let's accumulate money.
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row  items-center justify-center gap-2"
        >
          <select
            id="types"
            name="types"
            value={queries.types || ""}
            onChange={(e) =>
              setQueries((prevState) => ({
                ...prevState,
                types: e.target.value,
              }))
            }
            className="bg-gray-100 outline-none border-2 border-gray-300 pl-3 w-full md:w-[250px] h-10 rounded-[10px]  placeholder:text-[18px] leading-4 font-normal"
          >
            <option value="">Select equb type</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
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
            className="bg-gray-100 outline-none border-2 border-gray-300 pl-3 w-full md:w-[250px] h-10 rounded-[10px]  placeholder:text-[18px] leading-4 font-normal"
            placeholder="amount of deposit"
          />

          <input
            id="member"
            name="member"
            value={queries.member || ""}
            onChange={(e) =>
              setQueries((prevState) => ({
                ...prevState,
                member: e.target.value ? parseInt(e.target.value) : undefined,
              }))
            }
            type="number"
            className="bg-gray-100 outline-none border-2 border-gray-300 pl-3 w-full md:w-[250px] h-10  rounded-[10px] placeholder:text-[18px] leading-4 font-normal"
            placeholder="number of members"
          />

          <button
            type="submit"
            className="bg-blue-400 h-10 flex md:w-fit w-full px-[14px] justify-center items-center rounded-[5px] cursor-pointer"
          >
            <FaSearch color="white" />
          </button>
        </form>
      </div>
      <div className="w-full md:container md:mx-auto md:max-w-7xl grid grid-cols-1 md:grid-cols-3 md:gap-14 gap-3 ">
        {filteredData.length > 0 ? (
          filteredData.map((equbItem) => (
            <Card
              key={equbItem._id}
              name={equbItem.name}
              amount={equbItem.amount}
              types={equbItem.types}
              No_member={equbItem.member}
              createdAt={equbItem.createdOn}
              equb_Group_id={equbItem._id}
              status={equbItem.status}
            />
          ))
        ) : isSearched ? (
          <p>No result found</p>
        ) : (
          equbType.map((equbItem) => (
            <Card
              key={equbItem._id}
              name={equbItem.name}
              amount={equbItem.amount}
              types={equbItem.types}
              No_member={equbItem.member}
              createdAt={equbItem.createdOn}
              equb_Group_id={equbItem._id}
              status={equbItem.status}
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
