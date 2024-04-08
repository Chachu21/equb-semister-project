interface header {
  id: string;
  title: string;
}

type TableRow = {
  [key: string]: any;
};

interface tableProps {
  header: header[];
  datas: TableRow[];
}
const Tables = ({ header, datas }: tableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[460px]">
        <thead>
          <tr>
            {header.map((item) => (
              <th
                key={item.id}
                className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md"
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((row, index) => (
            <tr key={index}>
              {header.map((headers) => (
                <td key={headers.id}>{row[headers.id]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
