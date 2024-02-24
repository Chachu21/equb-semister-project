import React from "react";

interface header{
    id: string,
    title:string,
}

interface tableData{
    id: string,
    url: string,
    status: string,
    earning: string,
    service: string,
    
}

interface tableProps{
    header: header[],
    datas:tableData[],
}
  

const Tables = ({header, datas}:tableProps) => {
//     const tableData= [
//       {
//         id: "1",
//         url: "/equb2.jpg",
//         status: "pending",
//         earning: "2342",
//         service: "something",
//       },
//       {
//         id: "2",
//         url: "/equb2.jpg",
//         status: "pending",
//         earning: "2342",
//         service: "something",
//       },
//       {
//         id: "3",
//         url: "/equb2.jpg",
//         status: "pending",
//         earning: "2342",
//         service: "something",
//       },
//       {
//         id: "4",
//         url: "/equb2.jpg",
//         status: "pending",
//         earning: "2342",
//         service: "something",
//       },
//       {
//         id: "5",
//         url: "/equb2.jpg",
//         status: "pending",
//         earning: "2342",
//         service: "something",
//       },
//       {
//         id: "6",
//         url: "/equb2.jpg",
//         status: "pending",
//         earning: "2342",
//         service: "something",
//       },
//       {
//         id: "7",
//         url: "/equb2.jpg",
//         status: "success",
//         earning: "9657",
//         service: "forever",
//       },
//       {
//         id: "8",
//         url: "/equb1.jpg",
//         status: "complate",
//         earning: "4690968",
//         service: "everything",
//       }
//     ];
    
//  const tableHead= [
//    { id: "1", title: "service" },
//    { id: "2", title: "earning" },
//    { id: "3", title: "status" },
//  ];
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
          {datas.map((data) => (
            <tr key={data.id}>
              <td className="py-2 px-4 border-b border-b-gray-50">
                <div className="flex items-center">
                  <img
                    src={data.url}
                    alt=""
                    className="w-8 h-8 rounded object-cover block"
                  />
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                  >
                    {data.service}
                  </a>
                </div>
              </td>
              <td className="py-2 px-4 border-b border-b-gray-50">
                <span className="text-[13px] font-medium text-emerald-500">
                  {data.earning}
                </span>
              </td>
              <td className="py-2 px-4 border-b border-b-gray-50">
                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                  {data.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
