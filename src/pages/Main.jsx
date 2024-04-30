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
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";


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

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/prompt');
  };

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

  const handleFileUpload = async (e) => {
    let file = "";
    await getBase64(e.target.files[0]).then((data) => {
      console.log(data);
      setFile(data);
    });
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      EvidenceBinary: file?.split(",")[1],
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
        "http://127.0.0.1:5000/get_evidence_from_documents",
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
      const result = await axios.post("http://127.0.0.1:5000/get_documents", {
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

  return (
    <div>
      <Navbar />
      <div>
        <Loader isLoading={loading} />
        <div className="">
        <select
          className="bg-gray-700 hover:bg-gray-900 mb-2 mt-4 ml-auto mr-10 border text-center font-semibold text-white text-md rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 block w-fit px-5 py-2.5"
          onChange={(e) => {
            const selectedOption = e.target.value;
            window.location.href = selectedOption;
          }}
          
        >
          <option value="" className="bg-white text-black">Dropdown Menu</option>
          <option value="/prompt" className="bg-white text-black">
            Contract Generation using prompts
          </option>
          <option value="/fileView" className="bg-white text-black">Contract Creation using form</option>
        </select>
        
        </div>
        <div className="flex flex-col md:flex-row h-screen">
          <div className="w-full md:w-3/5 h-screen ">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-8 mx-4">File Upload</h2>
              <div className="bg-white p-4 rounded-md  h-96 overflow-y-auto">
                <form onSubmit={handleFileSubmit}>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="p-2  rounded-lg mb-4"
                    multiple
                  />{" "}
                  <button
                    type="submit"
                    className="p-4 bg-black text-white rounded-md hover:bg-slate-900"
                  >
                    {" "}
                    Submit Document{" "}
                  </button>{" "}
                </form>{" "}
                {/* <div className="bg-white p-4 rounded-md h-44 mb-4 max-h-300">
                <p className="text-semibold text-lg">kas</p>
              </div> */}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex flex-col w-full md:w-2/5 p-8">
            <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
              Give a Prompt
            </h1>
            <input
              type="text"
              value={question}
              onChange={handleQuestionChange}
              placeholder="Type your question here..."
              className="p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto"
            />
            <button
              onClick={handleQuestionSubmit}
              type="submit"
              className="p-4 bg-black text-white rounded-md hover:bg-slate-900"
            >
              Submit
            </button>
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-left">Response:</h2>

              <div className="bg-white p-4 rounded-md border border-gray-300 h-44 mb-4 overflow-y-auto scroll-smooth max-h-300">
                <p className="text-bold text-lg">Response :{response}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/5 h-screen overflow-y-auto">
            <div className="p-8">
              <h2 className="text-xl font-bold mb-8 ">Supporting Documents </h2>
              <div className="bg-white p-4 rounded-md border border-gray-300 h-96 overflow-y-auto">
                <select
                  id="vendorid"
                  name="documentid"
                  onClick={(e) => {
                    setDocname(e.target.value);
                  }}
                  className="bg-gray-50  max-w-xs my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="" selected disabled hidden>
                    Choose a document
                  </option>

                  {documents?.map((item, key) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
                {
                  documents1?.find((s) => s.doc_file_name == doc_name)
                    ?.doc_summarys
                }
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/5 h-screen overflow-y-auto">
            <div className="p-8">
              <h2 className="text-xl font-bold mb-8 ">Evidence</h2>
              <div className="bg-white p-4 rounded-md border border-gray-300 h-96 overflow-y-auto">
                <button
                  type="submit"
                  className="p-4 bg-black text-white rounded-md hover:bg-slate-900"
                  onClick={getEvidence}
                >
                  Get Evidence
                </button>
                {Evidence.length === 0 && (
                  <p className="text-center mt-32">No evidence found.</p>
                )}
                {Evidence.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
const fetchAPI = async (e, question) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://127.0.0.1:5000/get_answers", {
      question,
    });
    return res.data;
  } catch (error) {
    throw new Error("An Error occurred while fetching the data.");
  }
};
export default Main;
