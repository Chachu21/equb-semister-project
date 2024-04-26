<<<<<<< .merge_file_yz7mmA
interface TableProps<T extends Record<string, any>> {
  header: { [key: string]: string };
  data: T[];
}

const Tables = <T extends Record<string, any>>({
  header,
  data,
}: TableProps<T>) => {
  return (
    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-[16px] text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
=======
import { useState } from "react";
interface Header {
  id: string;
  title: string;
}

type TableRow<T> = {
  [K in keyof T]: string | number | boolean | Date | null | undefined;
};

interface TableProps<T> {
  header: Header[];
  datas: TableRow<T>[];
  onDelete: (Id: string) => void;
}

const Tables = <T,>({ header, datas, onDelete }: TableProps<T>) => {
  //set current page is by default 1
  const [currentPage, setCurrentPage] = useState<number>(1);
  //set nubber of table list in single page is 6
  const [itemsPerPage] = useState<number>(5);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (Id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      onDelete(Id);
    }
  };
  // logic for paginations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
>>>>>>> .merge_file_T5D6xZ
          <tr>
            {Object.keys(header).map((key) => (
              <th key={key} scope="col" className="px-6 py-3">
                {header[key]}
              </th>
            ))}
            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
              Actions
            </th>
          </tr>
        </thead>
<<<<<<< .merge_file_yz7mmA
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {Object.keys(header).map((key) => (
                <td key={key} className="px-6 py-4">
                  {item[key]}
                </td>
              ))}
=======
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((data, index) => (
            <tr key={index}>
              {Object.values(data).map((value, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  {String(value)}
                </td>
              ))}

              <td>
                <button
                  onClick={() => handleDelete(data._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
>>>>>>> .merge_file_T5D6xZ
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Showing{" "}
          <span className="font-semibold p-1 text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {indexOfFirstItem + 1}
          </span>
          -
          <span className="font-semibold p-1  text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {Math.min(indexOfLastItem, datas.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold p-1  text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {datas.length}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: Math.ceil(datas.length / itemsPerPage) }).map(
            (item, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    index + 1 === currentPage ? "text-blue-600 bg-blue-50" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(datas.length / itemsPerPage)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Tables;
