import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import GraphComponent3 from "../components/GraphComponent3";
import GraphComponent4 from "../components/GraphComponent4";
import Data from "./PowerBI-dash.csv";
import Papa from "papaparse";

const ManagementDashboard = () => {
  const [timeFrame, setTimeFrame] = useState(60);
  const [data, setData] = useState([]);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(year, month - 1, day);
  };

  const getSowExpiringCount = (timeFrame) => {
    const currentDate = new Date();
    const filteredData = data.filter((row) => {
      const endDate = parseDate(row.SOW_End_Date);
      const diffInDays = Math.ceil(
        (endDate - currentDate) / (1000 * 60 * 60 * 24)
      );
      return diffInDays <= timeFrame && diffInDays >= 0;
    });
    return filteredData.length;
  };

  const getTotalValueInProgress = () => {
    const totalAmounts = data.map((row) => parseFloat(row.Total_Amount) || 0);
    const total = totalAmounts.reduce((total, amount) => total + amount, 0);
    return Number(String(total).slice(0, 2));
  };

  const getSowInProgressCount = () => {
    return data.length;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;
      console.log("Parsed Data:", parsedData);
      setData(parsedData);
    };
    fetchData();
  }, []);

  const handleTimeFrameChange = (e) => {
    setTimeFrame(parseInt(e.target.value));
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white p-6 mx-10 mt-4">
        <h1 className="text-3xl font-bold text-black">Management Dashboard</h1>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg">Total SOW In Progress</h2>
            <p className="text-3xl font-semibold">{getSowInProgressCount()}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg">Total Value in Progress</h2>
            <p className="text-3xl font-semibold">
              {getTotalValueInProgress()}M
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg">
              Total SOWs expiring in{" "}
              <select
                value={timeFrame}
                onChange={handleTimeFrameChange}
                className="ml-2 bg-white border border-gray-300 rounded-md"
              >
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
              </select>
            </h2>
            <p className="text-3xl font-semibold">
              {getSowExpiringCount(timeFrame)}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg">Total projects in progress</h2>
            <p className="text-3xl font-semibold">{getSowInProgressCount()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg mb-2">
              Contract value by supplier
            </h2>
            <GraphComponent3 />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg mb-2">Active SOW Trend</h2>
            <GraphComponent4 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
