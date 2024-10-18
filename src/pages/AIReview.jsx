import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function AIReview() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { selectedClauses } = state || {};
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [outputColours, setOutputColours] = useState(
    Array(selectedClauses?.length).fill("text-gray-500")
  );
  const [clauses, setClauses] = useState([
    // ... (other clauses)
  ]);

  const toggleExpand = (index) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
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

  const handleFileSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let obj = {
      EvidenceBinary: file?.split(",")[1],
      file_name: uploadedFile.name
        .split(".")
        .slice(0, -1)
        .join("."),
    };
    let url = "https://contractflow-backend.azurewebsites.net/upload_doc";
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: url,
      data: obj,
    };

    await axios(config)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
        alert("File uploaded successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // const handleAIRevise = async (index) => {
  //   setLoading(true);
  //   const question = clauses[index].content + ` Is this clause present in the document?`;
  //   const file_name = "./temp/" + uploadedFile.name;
  //   const url = "https://contractflow-backend.azurewebsites.net/get_answers_for_file"; // replace with your API URL
  //   const config = {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     url: url,
  //     data: {
  //       question,
  //       file_name,
  //     },
  //   };
  //   try {
  //     const res = await axios(config);
  //     const newClauses = [...clauses];
  //     newClauses[index].outputAIRevise = res.data.answer;
  //     setClauses(newClauses);

  //     const newOutputColours = { ...outputColours };
  //     newOutputColours[index] = res.data.answer.toLowerCase().includes("yes")
  //       ? "text-green-500"
  //       : res.data.answer.toLowerCase().includes("no")
  //         ? "text-red-500"
  //         : "";
  //     setOutputColours(newOutputColours);
  //     setLoading(false);
  //     toast.success("AI revised the clause successfully");
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };

  const handleAIRevise = async (index) => {
    setLoading(true);
    const question = selectedClauses[index].content + ` Is this clause present in the document?`;
    const file_name = "./temp/" + uploadedFile.name;
    const url = "https://contractflow-backend.azurewebsites.net/get_answers_for_file";
    
    try {
      const res = await axios.post(url, { question, file_name }, {
        headers: { "Content-Type": "application/json" }
      });
  
      console.log('AI Revise Response:', res.data); // Debug log
  
      const newClauses = [...selectedClauses];
      newClauses[index].outputAIRevise = res.data.answer;
      setClauses(newClauses);
  
      const newOutputColours = [...outputColours];
      newOutputColours[index] = res.data.answer.toLowerCase().includes("yes")
        ? "text-green-500"
        : res.data.answer.toLowerCase().includes("no")
          ? "text-red-500"
          : "text-gray-500";
      setOutputColours(newOutputColours);
      
      toast.success("AI revised the clause successfully");
    } catch (err) {
      console.error('Error in AI Revise:', err);
      toast.error("Failed to revise clause");
    } finally {
      setLoading(false);
    }
  };
  

  // const handleAddRevise = async (index) => {
  //   setLoading(true);
  //   const question = clauses[index].content + ` Give me a statement to add clause to the document`;
  //   const file_name = "./tmp/" + uploadedFile.name;
  //   const getAnswersConfig = {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     url: "https://contractflow-backend.azurewebsites.net/get_answers_for_file",
  //     data: {
  //       question,
  //       file_name,
  //     },
  //   };
  //   try {
  //     const getAnswersRes = await axios(getAnswersConfig);
  //     const regex = /\"([^\"]*[a-zA-Z].*?)\"/g; // Match text inside double quotes that starts with a letter
  //     let match;
  //     while ((match = regex.exec(getAnswersRes.data.answer))) {
  //       const textToExcludeNumber = match[1].replace(/^\d+\.\d+\s*/, ''); // Remove the number at the beginning
  //       const generateAgreementConfig = {
  //         method: "post",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         url: "https://contractflow-backend.azurewebsites.net/contract_review",
  //         data: {
  //           "key": textToExcludeNumber,
  //         },
  //       };
  //       const generateAgreementRes = await axios(generateAgreementConfig);
  //       // Handle the response from the second API call if needed
  //     }

  //     const newClauses = [...clauses];
  //     newClauses[index].outputAdd = getAnswersRes.data.answer;
  //     setClauses(newClauses);

  //     setLoading(false);
  //     toast.success("AI revised the clause and generated the agreement form successfully");
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };

  const handleAddRevise = async (index) => {
    if (index < 0 || index >= selectedClauses.length) {
      console.error('Index out of bounds:', index);
      toast.error('Index out of bounds');
      return;
    }
  
    const selectedClause = selectedClauses[index];
    if (!selectedClause || !selectedClause.content) {
      console.error('Clause content is undefined for index:', index);
      toast.error('Clause content is undefined');
      return;
    }
  
    setLoading(true);
    const question = selectedClause.content + ` Give me a statement to add clause to the document`;
    const file_name = "./temp/" + uploadedFile.name;
    const url = "https://contractflow-backend.azurewebsites.net/get_answers_for_file";
  
    try {
      const getAnswersRes = await axios.post(url, {
        question,
        file_name,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log('Add Revise Response:', getAnswersRes.data); // Debug log
  
      const regex = /\"([^\"]*[a-zA-Z].*?)\"/g;
      let match;
      while ((match = regex.exec(getAnswersRes.data.answer))) {
        const textToExcludeNumber = match[1].replace(/^\d+\.\d+\s*/, '');
        const generateAgreementConfig = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          url: "https://contractflow-backend.azurewebsites.net/contract_review",
          data: {
            key: textToExcludeNumber,
          },
        };
        await axios(generateAgreementConfig);
      }
  
      const newClauses = [...selectedClauses];
      newClauses[index].outputAdd = getAnswersRes.data.answer;
      setClauses(newClauses);
  
      toast.success("AI revised the clause and generated the agreement form successfully");
    } catch (err) {
      console.error('Error in Add Revise:', err);
      toast.error("Failed to add revision");
    } finally {
      setLoading(false);
    }
  };
  

  const handleApprove = async () => {
    toast.success("Contract approved successfully");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []); 
  return (
    <div className="min-h-screen bg-zinc-100">
  <Navbar />

  <Loader isLoading={loading} />

  <div className="container mx-auto p-6 flex flex-col md:flex-row h-full gap-6">
    {/* File Upload and Preview Section */}
    <div className="flex-1 bg-white shadow-lg rounded-lg p-6 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="file"
          id="file"
          className="form-input block w-56 px-2 py-1 border rounded"
          onChange={handleFileUpload}
        />
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 font-medium text-white rounded-md"
          onClick={handleFileSubmit}
        >
          Save
        </button>
      </div>

      <div className="text-zinc-800 dark:text-zinc-200">
        {uploadedFile && (
          <div className="bg-zinc-100 p-4 rounded-lg">
            {/* Preview the uploaded file */}
            <iframe
              src={file}
              width="100%"
              height="500px"
              className="border rounded-lg"
            />
          </div>
        )}
      </div>
    </div>

    {/* Clauses Section */}
    <div className="w-full md:w-96 bg-white shadow-lg rounded-lg p-6 overflow-auto">
      <h1 className="text-2xl font-semibold">Eligibilty Criterias</h1>
      <hr className="my-4 border-gray-200" />

      {selectedClauses.map((clause, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-semibold">{clause.title}</h2>
          <div className="mt-2 bg-zinc-100 p-4 rounded-lg">
            {/* Clause Content */}
            <p className={`text-sm ${expandedIndices.includes(index) ? '' : 'truncate'}`}>
              {clause.content}
            </p>
            <button
              onClick={() => toggleExpand(index)}
              className="mt-2 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white text-xs rounded-md"
            >
              {expandedIndices.includes(index) ? 'Collapse' : 'Expand'}
            </button>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 bg-teal-500 hover:bg-teal-700 text-white text-xs rounded-md"
                onClick={() => handleAIRevise(index)}
              >
                AI Revise
              </button>

              {outputColours[index] === "text-red-500" && (
                <button
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md"
                  onClick={() => handleAddRevise(index)}
                >
                  Add
                </button>
              )}
            </div>

            {/* AI Revised Output */}
            <p className={`mt-2 text-sm ${outputColours[index]}`}>
              {clause.outputAIRevise}
            </p>

            {clause.outputAdd && (
              <p className="mt-2 text-sm text-blue-500">
                {clause.outputAdd}
              </p>
            )}
          </div>
        </div>
      ))}

      <hr className="my-4 border-gray-400" />
      <button
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
        onClick={handleApprove}
      >
        Approve
      </button>
    </div>
  </div>
</div>

  );
}
