import React, { useState ,useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from "axios";

export default function ClauseReview() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [output , setOutput] = useState();
  const [loading, setLoading] = useState(false);
  const [clauses, setClauses] = useState([
    {
      title: 'Employee Solicitation Clause',
      content:
        'During the term of this SOW and for one (1) year thereafter, neither party shall solicit to hire, directly or indirectly, any employee of the other party who was involved in the provision or receipt of the services. This clause shall not restrict a party from hiring employees of the other party who apply unsolicited in response to a general advertising or recruitment campaign.',
    },
    {
      title: 'Liability Limitations Clause',
      content:
        'In no event, will either party be liable to the other for any indirect, special, consequential, punitive or incidental damages or loss of revenue, loss of data or loss of business or profits, however, caused, even if advised of the possibility of such damages and the maximum aggregate liability (whether in contract, tort (including negligence and willful misconduct)) of either party to the other, regardless of the form of claim, shall be limited to the aggregate fees paid or payable to Partner by the Company under the SOW in the preceding twelve months of the event giving rise to such claim.',
    },
    {
      title: 'Confidentiality Clause',
      content:
        'Neither party shall, without the express written consent of the other, make public or otherwise directly or indirectly reveal the contents or existence of this SOW or any confidential information exchanged between parties except to their employees/consultants/advisors who shall undertake a similar duty of confidentiality.',
    },
    {
      title: 'Governing Laws Clause',
      content: 'This SOW shall be governed by the laws of USA.',
    },
    {
      title: 'Agreement Renewal Clause',
      content: 'The agreement should not automatically be renewed.',
    },
    {
      title: 'Termination Terms Clause',
      content:
        'Happiest Minds and RMC have the right to terminate the agreement without any reason (for convenience) with 30 days’ notice. No members of the project team do not have the right to terminate the agreement without any reason (for convenience).',
    },
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

 

  const handleFileSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let obj = {
      EvidenceBinary: file?.split(",")[1],
      file_name:uploadedFile.name.split('.').slice(0, -1).join('.')
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


  const handleFileUpload = async (e) => {
    let file = "";
    
    await getBase64(e.target.files[0]).then((data) => {
      console.log(data);
      setFile(data);
    });
    setUploadedFile(e.target.files[0]);
    setFileName(file.name);
    
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
    try{

       const res =  await axios(config)
       const newClauses = [...clauses];
       newClauses[index].output = res.data.answer;
         setClauses(newClauses);
            alert("AI revised the clause successfully");
        } catch(err)  {
            setLoading(false);
            console.log(err);
        
    }
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
      <body className="bg-zinc-100 dark:bg-zinc-800">
      <Loader isLoading={loading} />
        <div className="flex flex-col md:flex-row h-screen">
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white dark:bg-zinc-700 shadow-lg p-4 rounded-lg">
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
                    <DocViewer
                      documents={[{ uri: URL.createObjectURL(uploadedFile) }]}
                      pluginRenderers={DocViewerRenderers}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-96 p-6 bg-white dark:bg-zinc-700 overflow-auto my-4 mx-10">
        {clauses.map((clause, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold dark:text-white">
              {clause.title}
            </h2>
            <div className="mt-2 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
              <p
                className={`text-sm ${
                  clause.expanded ? '' : 'truncate'
                } text-zinc-800 dark:text-zinc-200`}
              >
                {clause.content}
              </p>
              <button
                onClick={() => toggleExpand(index)}
                className="mt-2 px-3 py-1 bg-gray-900 hover:bg-gray-700 text-white text-xs rounded-md"
              >
                {clause.expanded ? 'Collapse' : 'Expand'}
              </button>
                
              
              <div className="flex">
                <button className="mt-2 px-3 py-1 bg-orange-500 text-white text-xs rounded-md"
                onClick={() => handleAIRevise(index)}>
                  Ai Revise
                </button>
              </div>
                <div className=" flex ml-2">{clause.output}</div>
            </div>
          </div>
        ))}
      </div>
        </div>
      </body>
    </div>
  );
}
