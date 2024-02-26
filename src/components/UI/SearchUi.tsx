import React, { useState, ChangeEvent } from "react";
import { HiSearch } from 'react-icons/hi';
interface Props {
  handleSearch: (term: string) => void;
  search: string;
}

const SearchUi: React.FC<Props> = ({ handleSearch,search }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value);
  };

 
  return (
    <div className="flex items-center space-x-2 mb-4">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={`Search by ${search}`}
       
        className="block w-48 sm:w-auto shadow-sm border-gray-300 rounded-md px-3 py-2 focus:outline-none"
      />
      <button
        onClick={() => handleSearch(searchTerm)}
        className="flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
      >
        <HiSearch className="w-5 h-5" /> {/* Using the search icon */}
      </button>
    </div>
  );
};

export default SearchUi;
