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
  name: string;
  members: number;
  amount: number;
  amt: number;
}

const LineCharts: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([
    {
      name: "Daily",
      members: 4000,
      amount: 2400,
      amt: 2400,
    },
    {
      name: "Weekly",
      members: 3000,
      amount: 1398,
      amt: 2210,
    },
    {
      name: "Monthly",
      members: 2000,
      amount: 9800,
      amt: 2290,
    },
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="members" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;
