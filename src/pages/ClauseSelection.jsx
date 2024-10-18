import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function ClauseSelection() {
  const [clauses, setClauses] = useState([]);
  const [selectedClauses, setSelectedClauses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClauses = async () => {
      try {
        const res = await axios.get("https://proj-contract-gpt-server.vercel.app/api/auth/clauses");
        setClauses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClauses();
  }, []);

  // Handle clause selection
  const handleSelectClause = (clause) => {
    setSelectedClauses((prev) => [...prev, clause]);
    toast.success("Clause selected successfully");
  };

  // Navigate to the review page
  const handleGoToReview = () => {
    navigate("/AiReview", { state: { selectedClauses } });
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl mt-20 font-bold text-gray-800 mb-6 text-center mx-10">Select Clauses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mx-10">
        {clauses.map((clause, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">{clause.title}</h2>
            <p className="text-gray-600 mt-2">{clause.content}</p>
            <button
              className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
              onClick={() => handleSelectClause(clause)}
            >
              Select Criteria!
            </button>
          </div>
        ))}
      </div>

      {/* Go to Review Button */}
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleGoToReview}
        >
          Go to Review
        </button>
      </div>
    </div>
  );
}
