import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  //  Legend,
  ResponsiveContainer,
} from "recharts";
import { groupsType } from "../../types/groupType";
import { usersType } from "../../types/usersType";
import { commetType } from "../../types/comments";
import { requestType } from "../../types/request";

const LineCharts: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  ); // Default to current month
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  const fetchData = async (month: number) => {
    try {
      const [
        commentsResponse,
        groupsResponse,
        requestsResponse,
        usersResponse,
      ] = await Promise.all([
        axios.get(`http://localhost:5000/api/v1/comment/get`),
        axios.get(`http://localhost:5000/api/v1/group/getAll`),
        axios.get(`http://localhost:5000/api/v1/request/get`),
        axios.get(`http://localhost:5000/api/v1/users`),
      ]);

      const comments = commentsResponse.data;
      const groups = groupsResponse.data;
      console.log("groupResponse :", groups);

      const requests = requestsResponse.data;
      const users = usersResponse.data;
      console.log("comments", comments);
      console.log("groups", groups);
      console.log("requests", requests);
      console.log("users", users);

      processData(month, comments, groups, requests, users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processData = (
    month: number,
    comments: commetType[],
    groups: groupsType[],
    requests: requestType[],
    users: usersType[]
  ) => {
    const monthlyData = [];

    // Count comments for the selected month
    const commentCount = comments.filter(
      (comment) => new Date(comment.createdAt).getMonth() + 1 === month
    ).length;
    monthlyData.push({ name: "Comments", count: commentCount });
    console.log(commentCount);

    // Count groups for the selected month
    const groupCount = groups.filter(
      (group) => new Date(group.createdOn).getMonth() + 1 === month
    ).length;
    monthlyData.push({ name: "Groups", count: groupCount });
    console.log("groupCount is :", groupCount);

    // Count requests for the selected month
    const requestCount = requests.filter(
      (request) => new Date(request.createdAt).getMonth() + 1 === month
    ).length;
    monthlyData.push({ name: "Requests", count: requestCount });

    // Count user signups for the selected month
    const userCount = users.filter(
      (user) => new Date(user.createdAt).getMonth() + 1 === month
    ).length;
    monthlyData.push({ name: "Users", count: userCount });

    setChartData(monthlyData);
  };

  console.log("chartData", chartData);
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(event.target.value);
    setSelectedMonth(selectedMonth);
  };

  return (
    <div>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <option key={month} value={month}>
            {monthNames[month - 1]}
          </option>
        ))}
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ label }) => {
              const dataPoint = chartData.find((data) => data.name === label);
              return (
                <div style={{ backgroundColor: "white", padding: "5px" }}>
                  <p>{dataPoint && `${dataPoint.name}: ${dataPoint.count}`}</p>
                </div>
              );
            }}
          />
          {/* <Legend /> */}
          {chartData.map((entry, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey="count"
              stroke={colors[index % colors.length]}
              name={entry.name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;

// Array of month names for formatting X-axis ticks
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Array of colors for different lines
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
