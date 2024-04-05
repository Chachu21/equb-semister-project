// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// interface DataItem {
//   month: string;
//   daily: number;
//   weekly: number;
//   monthly: number;
// }

// const LineCharts: React.FC = () => {
//   const [data, setData] = useState<DataItem[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get<DataItem[]>(
//           "http://localhost:5000/api/v1/data" // Replace this with your backend API endpoint
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="daily"
//           stroke="#8884d8"
//           activeDot={{ r: 8 }}
//           name="Daily"
//         />
//         <Line
//           type="monotone"
//           dataKey="weekly"
//           stroke="#82ca9d"
//           activeDot={{ r: 8 }}
//           name="Weekly"
//         />
//         <Line
//           type="monotone"
//           dataKey="monthly"
//           stroke="#ff7300"
//           activeDot={{ r: 8 }}
//           name="Monthly"
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default LineCharts;

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  month: string;
  daily: number;
  weekly: number;
  monthly: number;
}

const LineCharts: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([
    {
      month: "January",
      daily: 30,
      weekly: 15,
      monthly: 90,
    },
    {
      month: "February",
      daily: 40,
      weekly: 60,
      monthly: 80,
    },
    {
      month: "March",
      daily: 55,
      weekly: 72,
      monthly: 120,
    },
    {
      month: "April",
      daily: 31,
      weekly: 59,
      monthly: 90,
    },
     {
      month: "May",
      daily: 48,
      weekly: 64,
      monthly: 156,
    },
    {
      month: "June",
      daily: 59,
      weekly: 78,
      monthly: 190,
    },{
      month: "July",
      daily: 30,
      weekly: 15,
      monthly: 90,
    },
     {
      month: "August",
      daily: 40,
      weekly: 60,
      monthly: 80,
    },
    {
      month: "September",
      daily: 55,
      weekly: 72,
      monthly: 120,
    },
    {
      month: "October",
      daily: 31,
      weekly: 59,
      monthly: 90,
    },
    {
      month: "November",
      daily: 48,
      weekly: 64,
      monthly: 156,
    },
    {
      month: "December",
      daily: 59,
      weekly: 78,
      monthly: 190,
    },
    // Add more data for other months as needed
  ]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="daily"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Daily"
        />
        <Line
          type="monotone"
          dataKey="weekly"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
          name="Weekly"
        />
        <Line
          type="monotone"
          dataKey="monthly"
          stroke="#ff7300"
          activeDot={{ r: 8 }}
          name="Monthly"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;
