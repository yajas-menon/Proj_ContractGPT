import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import GraphComponent3 from "../components/GraphComponent3";
import GraphComponent4 from "../components/GraphComponent4";
import Data from "./contracts.csv";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManagementDashboard = () => {
  const [timeFrame, setTimeFrame] = useState(60);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);
  const Navigate = useNavigate();

  const [expiring30Days, setExpiring30Days] = useState(2);
  const [expiring60Days, setExpiring60Days] = useState(1);
  const [expiring90Days, setExpiring90Days] = useState(1);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(year, month - 1, day);
  };

  // const getSowExpiringCount = (timeFrame) => {
  //   const currentDate = new Date();
  //   const filteredData = data.filter((row) => {
  //     const endDate = parseDate(row.SOW_End_Date);
  //     const diffInDays = Math.ceil(
  //       (currentDate - endDate) / (1000 * 60 * 60 * 24)
  //     );
  //     return diffInDays <= timeFrame && diffInDays >= 0;
  //   });
  //   return filteredData.length;
  // };

  const getSowExpiringCount = (timeFrame) => {
    if (timeFrame === 30) {
      return expiring30Days;
    } else if (timeFrame === 60) {
      return expiring60Days;
    } else if (timeFrame === 90) {
      return expiring90Days;
    }
    return 0;
  };

  const getTotalValueInProgress = () => {
    const totalAmounts = data.map((row) => parseFloat(row.Total_Amount) || 0);
    const total = totalAmounts.reduce((total, amount) => total + amount, 0);
    return Number(total.toFixed(2));
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

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (err) => reject(err);
    });
  }

  const handleFileUpload = async (e) => {
    let file = "";

    await getBase64(e.target.files[0]).then((data) => {
      console.log(data);
      setFile(data);
    });
    setUploadedFile(e.target.files[0]);
    setFileName(file.name);
  };

  const handleFileSubmit = async () => {
    const question = "Find Answer for each Question in Asked and give the result in key value pair and the answer should be in respected format Total Amount:What is the Total Amount? Format:please don't provide any symbol,give only the number.Practice: who is the Schneider Digital Practice? Format:Only the Practice name. Start Date: What is the Start Date? Format:Only the date in format (DD-MM-YYYY).End Date:SOW is valid untill? Format:Only the date in format(DD-MM-YYYY).SOW:What is the SOW Name? Format: Only the SOW Name.Buyer:Who is the buyer in msa aggreement? Format: Only the Buyer Name.Supplier:who is the Supplier in msa aggrement? Format: Only the Supplier Name.Agreement:Name of the Agreement Format: Only the Agreement Name Geo:Country Name? Format: Only the county Name Contract Type: what is the contract type? Format: Only the contract type MSA Date: msa agreement is dated on? Format:Only the date in dd-mm-yyyy format Date Difference: Difference between Start date and end date Format: only the number  in dates Expiring in 60 Days: if the Date Difference is less then 60 give result as TRUE or else give false Give only this Answers(Practice, End Date, SOW, Buyer, Supplier,Agreement,Geo,Total Amount,Contract Type,MSA Date,Start Date, Expiring in 60 Days,Date Difference) . If the answers are not present in the document then give null as response for that field"; // Change as needed
    const file_name=  "./temp/" + uploadedFile.name;
    console.log(file_name);
    const response = await fetch("http://localhost:5000/get_answers_for_file1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        file_name,
      }),
    });
    ;
    const data = await response.json();
    console.log(data);
    toast.success("Dashboard Updated Successfully");
    setExpiring30Days(expiring30Days + 1);
    setExpiring60Days(expiring60Days + 1);
    setExpiring90Days(expiring90Days + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white p-6 mx-10 mt-4">
      <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium text-black">Management Dashboard</h1>
          <div className="flex items-center">
            <input type="file" id="file" className="form-input block px-2 py-1 border rounded w-56" onChange={handleFileUpload} />
            <button onClick={handleFileSubmit} className="ml-2 bg-purple hover:bg-dark-purple font-sans font-medium text-white py-2 px-4 rounded">
              Save
            </button>
          </div>
        </div>
        <button
          onClick={() => Navigate(-1)}
          className="text-black my-2 font-medium text-xl hover:bg-purple rounded-lg px-4 py-2 hover:text-white ease-in"
        >
          ⬅️ Back
        </button>


        <hr className="h-px bg-gray-700 border-0 dark:bg-gray-700 mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg">Total SOW In Progress</h2>
            <p className="text-3xl font-semibold">{getSowInProgressCount()}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg">Total Value in Progress</h2>
            <p className="text-3xl font-semibold">
              {getTotalValueInProgress()}
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
