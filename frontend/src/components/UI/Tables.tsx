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
          <tr>
            {Object.keys(header).map((key) => (
              <th key={key} scope="col" className="px-6 py-3">
                {header[key]}
              </th>
            ))}
          </tr>
        </thead>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
