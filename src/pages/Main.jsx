// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Loader from "../components/Loader";

// const Main = () => {
//   const [question, setQuestion] = useState("");
//   const [response, setResponse] = useState("");
//   const [doc_name, setDocname] = useState("");
//   const [documents, setDocuments] = useState([]);
//   const [documents1, setDocuments1] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [messageList, setMessageList] = useState([]);
//   const [Evidence, setEvidence] = useState([]);

//   const handleQuestionChange = (event) => {
//     setQuestion(event.target.value);
//   };

//   const handleQuestionSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     try {
//       const apiResponse = await fetchAPI(question);
//       setResponse(apiResponse.answer);
//       setMessageList(apiResponse.message_list);
//       await fetchData();
//     } catch (error) {
//       setLoading(false);
//       setResponse(error.message);
//     }
//   };

//   async function getEvidence() {
//     let obj = {
//       message_list: messageList,
//     };
//     console.log(obj , messageList)
//     try {
//       const result = await axios.post(
//         "http://127.0.0.1:5000/get_evidence_from_documents",
//         {
//           message_list: messageList,
//         }
//       );
//       let response = result.data.evidence;
//       let keys = Object.keys(response);

//       let arr = [];
//       keys?.map((item, key) => {
//         arr.push(response[item]);
//       });
//       setEvidence(arr);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   }

//   async function fetchData() {
//     try {
//       const result = await axios.post("http://127.0.0.1:5000/get_documents", {
//         question,
//       });
//       setDocuments1(result.data);
//       let x = new Set();
//       result.data.map((item, key) => {
//         x.add(item.doc_file_name);
//       });
//       let arr = Array.from(x);
//       setDocuments(arr);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   }

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 2500);
//   }, []);

//   // const handleInputChange = (e) => {
//   //   setFormData({
//   //     ...formData,
//   //     [e.target.id]: e.target.value,
//   //   });
//   // };

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="flex flex-col md:flex-row h-screen">
//           <div className="flex flex-col w-full md:w-2/5 p-8">
//             <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
//               Give a Prompt
//             </h1>
//             <form onSubmit={handleQuestionSubmit} className="flex flex-col">
//               <input
//                 type="text"
//                 value={question}
//                 onChange={handleQuestionChange}
//                 placeholder="Type your question here..."
//                 className="p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto"
//               />
//               <button
//                 type="submit"
//                 className="p-4 bg-black text-white rounded-md hover:bg-slate-900"
//               >
//                 Submit
//               </button>
//             </form>
//             <div className="mt-8">
//               <h2 className="text-2xl font-bold mb-4 text-left">Response:</h2>

//               <div className="bg-white p-4 rounded-md border border-gray-300 h-44 mb-4 overflow-y-auto scroll-smooth max-h-300">
//                 <p className="text-semibold text-lg">{response}</p>
//               </div>
//             </div>
//           </div>
//           <div className="w-full md:w-3/5 h-screen overflow-y-auto">
//             <div className="p-8">
//               <h2 className="text-xl font-bold mb-8 ">Supporting Documents </h2>
//               <div className="bg-white p-4 rounded-md border border-gray-300 h-96 overflow-y-auto">
//                 <select
//                   id="vendorid"
//                   name="documentid"
//                   onClick={(e) => {
//                     setDocname(e.target.value);
//                   }}
//                   className="bg-gray-50  max-w-xs my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   // onChange={handleInputChange}
//                 >
//                   <option value="" selected disabled hidden>
//                     Choose a document
//                   </option>

//                   {documents?.map((item, key) => {
//                     return <option value={item}>{item}</option>;
//                   })}
//                 </select>
//                 {
//                   documents1?.find((s) => s.doc_file_name == doc_name)
//                     ?.doc_summarys
//                 }
//               </div>
//             </div>
//           </div>
//           <div className="w-full md:w-3/5 h-screen overflow-y-auto">
//             <div className="p-8">
//               <h2 className="text-xl font-bold mb-8 ">Evidence</h2>
//               <div className="bg-white p-4 rounded-md border border-gray-300 h-96 overflow-y-auto">
//                 <button
//                   type="submit"
//                   className="p-4 bg-black text-white rounded-md hover:bg-slate-900"
//                   onClick={getEvidence}
//                 >
//                   Get Evidence
//                 </button>
//                 {Evidence.length === 0 && (
//                   <p className="text-center mt-32">No evidence found.</p>
//                 )}
//                 {Evidence.map((item, index) => {
//                   return (
//                     <div key={index}>
//                       <p>{item}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const fetchAPI = async (question) => {
//   try {
//     const res = await axios.post("http://127.0.0.1:5000/get_answers", {
//       question,
//     });
//     return res.data;
//   } catch (error) {
//     throw new Error("An Error occurred while fetching the data.");
//   }
// };

// export default Main;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";

const Main = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [doc_name, setDocname] = useState("");
  const [documents, setDocuments] = useState([]);
  const [documents1, setDocuments1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [Evidence, setEvidence] = useState([]);
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState("")
  

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };
  

  const navigate = useNavigate();

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await fetchAPI(event, question);
      setResponse(apiResponse.answer);
      setMessageList(apiResponse.message_list);
      await fetchData();
    } catch (error) {
      setLoading(false);
      setResponse(error.message);
    }
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

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFileSize(formatBytes(uploadedFile.size));
      await getBase64(uploadedFile).then((data) => {
        console.log(data);
        setFile(data);
      });
      setUploadedFile(e.target.files[0])
      setFileName(uploadedFile.name)
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    let obj = {
      EvidenceBinary: file?.split(",")[1],
      file_name: uploadedFile.name.split(".").slice(0, -1).join("."),
    };
    console.log(obj);
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
        setLoading(false)
        toast.success("File uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function getEvidence() {
    let obj = {
      message_list: messageList,
    };
    console.log(obj, messageList);
    try {
      const result = await axios.post(
        "https://contractflow-backend.azurewebsites.net/get_evidence_from_documents",
        {
          message_list: messageList,
        }
      );
      let response = result.data.evidence;
      let keys = Object.keys(response);

      let arr = [];
      keys?.map((item, key) => {
        arr.push(response[item]);
      });
      setEvidence(arr);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  async function fetchData() {
    try {
      const result = await axios.post("https://contractflow-backend.azurewebsites.net/get_documents", {
        question,
      });
      setDocuments1(result.data);
      let x = new Set();
      result.data.map((item, key) => {
        x.add(item.doc_file_name);
      });
      let arr = Array.from(x);
      setDocuments(arr);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const getFileLink = () => {
    if (file && fileName) {
      const base64Prefix = "data:application/octet-stream;base64,";
      const fileData = base64Prefix.concat(file.split(",")[1]);
      return {
        type: "application/octet-stream",
        href: fileData,
        download: fileName,
      };
    }
    return null;
  };

  return (
    <div>
      <Navbar />
      <div>
        <Loader isLoading={loading} />
        <div className="flex flex-col h-screen mt-4">
          <div className="p-8">
            <h2 className="text-3xl font-sans font-medium mb-8 mx-4">File Upload</h2>
            <div className="bg-white p-4 rounded-md mb-4 border border-gray-300">
              <form onSubmit={handleFileSubmit} className="w-full">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="p-2 rounded-lg mb-4 w-full"
                  multiple
                />
                {fileSize && <p className="mb-2 ml-2">File size: {fileSize}</p>}
                <button
                  type="submit"
                  className="p-4 bg-purple text-white rounded-md hover:bg-dark-purple"
                >
                  Submit Document
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-row h-full p-8">
            <div className="w-1/2 pr-4">
              <h1 className="text-3xl font-sans font-medium mb-8 text-left">
                Give a Prompt
              </h1>
              <textarea
                type="text"
                value={question}
                onChange={handleQuestionChange}
                placeholder="Type your question here..."
                className="p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-96 w-full"
              />
              <button
                onClick={handleQuestionSubmit}
                type="submit"
                className="p-4 bg-purple text-white rounded-md hover:bg-dark-purple w-full"
              >
                Submit
              </button>
            </div>
            <div className="w-1/2 pl-4">
              <h2 className="text-3xl font-sans font-medium mb-8 text-left">Response:</h2>
              <div className="bg-white p-4 rounded-md border border-gray-300 h-96 overflow-y-auto">
                <p className="text-bold text-lg">Response: {response}</p>

              </div>
            </div>
          </div>
          <hr className="my-4 mx-8" />
          <div className="flex flex-row h-full p-8">
            <div className="w-1/2 pr-4">
              <h2 className="text-3xl font-sans font-medium mb-8">Supporting Documents</h2>
              <div className="bg-white p-4 rounded-md border border-gray-300 h-96 overflow-y-auto">
                <select
                  id="vendorid"
                  name="documentid"
                  onClick={(e) => {
                    setDocname(e.target.value);
                  }}
                  className="bg-gray-50 max-w-xs my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="" selected disabled hidden>
                    Choose a document
                  </option>
                  {documents?.map((item, key) => (
                    <option key={key} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {documents1?.find((s) => s.doc_file_name == doc_name)?.doc_summarys}
                {getFileLink() && (
                  <a
                    href={getFileLink().href}
                    download={getFileLink().download}
                    className="block mt-4 text-blue-500 hover:underline"
                  >
                    Download File
                  </a>
                )}
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <h2 className="text-3xl font-sans font-medium mb-8">Evidence</h2>
              <div className="bg-white p-4 rounded-md border border-gray-300 h-96 overflow-y-auto">
                <button
                  type="submit"
                  className="p-4 bg-purple text-white rounded-md hover:bg-dark-purple"
                  onClick={getEvidence}
                >
                  Get Evidence
                </button>
                {Evidence.length === 0 && (
                  <p className="text-center mt-32">No evidence found.</p>
                )}
                {Evidence.map((item, index) => (
                  <div key={index}>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const fetchAPI = async (e, question) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://contractflow-backend.azurewebsites.net/get_answers", {
      question,
    });
    return res.data;
  } catch (error) {
    throw new Error("An Error occurred while fetching the data.");
  }
};
export default Main;
