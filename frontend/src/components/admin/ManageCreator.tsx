import { useState, useEffect } from "react";
import axios from "axios";
import SearchUi from "../UI/SearchUi";
import Tables from "../UI/Tables";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { usersType } from "../../types/usersType";
import { MdPersonAddAlt1 } from "react-icons/md";
interface UserData {
  address: string;
  name: string;
  phone: string;
  email: string;
  _id: string;
  city: string;
}

const ManageCreators = () => {
  const [tableData, setTableData] = useState<usersType[]>([]);
  const [filteredUser, setFilteredUser] = useState<UserData[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const userData = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchData();
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<usersType[]>(
        "http://localhost:5000/api/v1/users"
      );
      setTableData(response.data.filter((res) => res.role === "creator"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Extract only necessary fields from tableData
  const filteredData = tableData.map(
    ({ _id, name, email, phone, address, city }) => ({
      _id,
      name,
      email,
      phone,
      address,
      city,
    })
  );

  const handleSearch = (searchTerm: string) => {
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
        `http://localhost:5000/api/v1/users/delete/${userId}`,
        config
      );
      setTableData(tableData.filter((user) => user._id !== userId));
      setFilteredUser(filteredUser.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCreator = async () => {
    try {
      const token = userData?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Prepare data with default role of 'creator'
      const userDatas = {
        ...formData,
        role: "creator",
        agreeTerms: true,
      };

      await axios.post(
        "http://localhost:5000/api/v1/users/signup",
        userDatas,
        config
      );
      // Refetch data to update the table
      fetchData();
      // Clear form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      // Hide the form
      setShowForm(false);
    } catch (error) {
      console.error("Error adding creator:", error);
    }
  };

  const tableHead = [
    { id: "1", title: "ID" },
    { id: "2", title: "Name" },
    { id: "3", title: "Email" },
    { id: "4", title: "PHONE" },
    { id: "5", title: "Address" },
    { id: "6", title: "City" },
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage Creators</h1>
      <div className="flex justify-between my-6">
        <SearchUi handleSearch={handleSearch} search={"name"} />
        <button
          type="button"
          className={`bg-[#008B8B] hover:bg-[#7da7a7] text-white font-bold py-2 px-2 md:px-4 rounded ${
            screenWidth <= 415 ? "h-10 w-10" : "h-auto"
          }`}
          onClick={() => setShowForm(true)}
        >
          {screenWidth <= 415 ? <MdPersonAddAlt1 size={22} /> : "Add Creators"}
        </button>
      </div>

      <Tables
        header={tableHead}
        datas={filteredUser.length > 0 ? filteredUser : filteredData}
        onDelete={handleDelete}
      />
      {showForm && (
        <div className="container fixed top-0 left-0 w-full h-full z-[100] bg-black bg-opacity-75 flex justify-center items-center">
          <form className="container w-full md:max-w-2xl mx-auto my-3 bg-white p-8 rounded-lg">
            {/* Form inputs */}
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setShowForm(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number (09********)
                </label>
              </div>
            </div>
            <div className="flex justify-between py-4 space-x-16">
              <button
                type="submit"
                className="bg-[#008B8B] hover:bg-[#7da7a7] text-white font-bold py-2 px-8 rounded"
                onClick={handleAddCreator}
              >
                Add
              </button>
              <button
                type="button"
                className="bg-gray-100 text-gray-700 font-bold py-2 px-8 rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCreators;
