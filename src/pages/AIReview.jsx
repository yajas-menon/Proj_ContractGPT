import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { PDFDocument, rgb } from 'pdf-lib';
import axios from "axios";
import { toast } from "react-toastify";

export default function AIReview() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputColours, setOutputColours] = useState({});
  const [clauses, setClauses] = useState([
    {
      title: 'Employee Solicitation Clause',
      content:
        'During the term of this SOW and for one (1) year thereafter, neither party shall solicit to hire, directly or indirectly, any employee of the other party who was involved in the provision or receipt of the services. This clause shall not restrict a party from hiring employees of the other party who apply unsolicited in response to a general advertising or recruitment campaign.',
      outputAIRevise: '',
      outputAdd: '',
    },
    {
      title: 'Liability Limitations Clause',
      content:
        'In no event, will either party be liable to the other for any indirect, special, consequential, punitive or incidental damages or loss of revenue, loss of data or loss of business or profits, however, caused, even if advised of the possibility of such damages and the maximum aggregate liability (whether in contract, tort (including negligence and willful misconduct)) of either party to the other, regardless of the form of claim, shall be limited to the aggregate fees paid or payable to Partner by the Company under the SOW in the preceding twelve months of the event giving rise to such claim.',
      outputAIRevise: '',
      outputAdd: '',
    },
    {
      title: 'Confidentiality Clause',
      content:
        'Neither party shall, without the express written consent of the other, make public or otherwise directly or indirectly reveal the contents or existence of this SOW or any confidential information exchanged between parties except to their employees/consultants/advisors who shall undertake a similar duty of confidentiality.',
      outputAIRevise: '',
      outputAdd: '',
    },
    {
      title: 'Governing Laws Clause',
      content: 'This SOW shall be governed by the laws of USA.',
      outputAIRevise: '',
      outputAdd: '',
    },
    {
      title: 'Agreement Renewal Clause',
      content: 'The agreement should not automatically be renewed.',
      outputAIRevise: '',
      outputAdd: '',
    },
    {
      title: 'Termination Terms Clause',
      content:
        'Happiest Minds and RMC have the right to terminate the agreement without any reason (for convenience) with 30 days’ notice. No members of the project team do not have the right to terminate the agreement without any reason (for convenience).',
      outputAIRevise: '',
      outputAdd: '',
    },

    // ... (other clauses)
  ]);

  const toggleExpand = (index) => {
    const newClauses = [...clauses];
    newClauses[index].expanded = !newClauses[index].expanded;
    setClauses(newClauses);
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
      file_name: uploadedFile.name.split('.').slice(0, -1).join('.')
    };
    let url = "http://127.0.0.1:5000/upload_doc";
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
        alert("File uploaded successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleAIRevise = async (index) => {
    setLoading(true);
    const question = clauses[index].content + ` Is this clause present in the document?`;
    const file_name = "./temp/" + uploadedFile.name;
    const url = "http://127.0.0.1:5000/get_answers_for_file"; // replace with your API URL
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: url,
      data: {
        question,
        file_name,
      },
    };
    try {
      const res = await axios(config);
      const newClauses = [...clauses];
      newClauses[index].outputAIRevise = res.data.answer;
      setClauses(newClauses);

      const newOutputColours = { ...outputColours };
      newOutputColours[index] = res.data.answer.toLowerCase().includes("yes")
        ? "text-green-500"
        : res.data.answer.toLowerCase().includes("no")
          ? "text-red-500"
          : "";
      setOutputColours(newOutputColours);
      setLoading(false);
      toast.success("AI revised the clause successfully");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleAddRevise = async (index) => {
    setLoading(true);
    const question = clauses[index].content + ` Give me a statement to add clause to the document`;
    const file_name = "./temp/" + uploadedFile.name;
    const getAnswersConfig = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://127.0.0.1:5000/get_answers_for_file",
      data: {
        question,
        file_name,
      },
    };
    try {
      const getAnswersRes = await axios(getAnswersConfig);
      const regex = /\"([^\"]*[a-zA-Z].*?)\"/g; // Match text inside double quotes that starts with a letter
      let match;
      while ((match = regex.exec(getAnswersRes.data.answer))) {
        const textToExcludeNumber = match[1].replace(/^\d+\.\d+\s*/, ''); // Remove the number at the beginning
        const generateAgreementConfig = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          url: "http://127.0.0.1:5000/contract_review",
          data: {
            "key": textToExcludeNumber,
          },
        };
        const generateAgreementRes = await axios(generateAgreementConfig);
        // Handle the response from the second API call if needed
      }

      const newClauses = [...clauses];
      newClauses[index].outputAdd = getAnswersRes.data.answer;
      setClauses(newClauses);

      setLoading(false);
      toast.success("AI revised the clause and generated the agreement form successfully");
    } catch (err) {
      setLoading(false);
      console.log(err);
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
    <div>
      <Navbar />
      <body className="bg-zinc-100">
        <Loader isLoading={loading} />
        <div className="flex flex-col md:flex-row h-screen">
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white shadow-lg p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <input type="file" id="file" onChange={handleFileUpload} />
                <button className="px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-md"
                  onClick={handleFileSubmit}>
                  Save
                </button>
              </div>
              <div className="text-zinc-800 dark:text-zinc-200">
                <div className="bg-zinc-100 p-4 rounded-lg mb-4 mt-4">
                  {uploadedFile && (
                    <iframe
                      src={file}
                      width="100%"
                      height="500px"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-96 p-6 bg-white overflow-auto my-4 mx-10 scroll">
            <h1 className="text-2xl font-semibold">Non-Negotiable clauses</h1>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            {clauses.map((clause, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-lg font-semibold dark:text-black">
                  {clause.title}
                </h2>
                <div className="mt-2 bg-zinc-100 p-4 rounded-lg">
                  <p
                    className={`text-sm ${clause.expanded ? '' : 'truncate'}`}
                  >
                    {clause.content}
                  </p>
                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-2 px-3 py-1 bg-gray-900 hover:bg-gray-700 hover:text-white text-white text-xs rounded-md"
                  >
                    {clause.expanded ? 'Collapse' : 'Expand'}
                  </button>

                  <div className="flex">
                    <button className="mt-2 px-3 py-1 bg-green-500 text-white text-xs rounded-md"
                      onClick={() => handleAIRevise(index)}>
                      AI Revise
                    </button>
                    {outputColours[index] === "text-red-500" && (
                      <button className="mt-2 ml-2 px-3 py-1 bg-red-500 text-white text-xs rounded-md"
                        onClick={() => handleAddRevise(index)}>
                        Add
                      </button>
                    )}
                  </div>

                  <p className={`mt-2 text-sm ${outputColours[index]}`}>
                    {clauses[index].outputAIRevise}
                  </p>
                  {clauses[index].outputAdd && (
                    <p className="mt-2 text-sm text-blue-500">
                      {clauses[index].outputAdd}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white text-sm rounded-md"
              onClick={handleApprove}
            >
              Approve Contract
            </button>
          </div>
        </div>
      </body>
    </div>
  );
}

