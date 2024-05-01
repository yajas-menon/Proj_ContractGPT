// import React, { useState , useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Loader from "../components/Loader";

// const FileView = () => {
//   const [metaData, setMetaData] = useState([
//     { key: "First name", value: "" },
//     { key: "second name", value: "" },
//     { key: "First date", value: "" },
//     { key: "second date", value: "" },
//     { key: "Description", value: "" },
//     { key: "amount", value: ""}
//   ]);
//   const [loading, setLoading] = useState(false);

//   // Function to handle changes in input fields
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setMetaData({ ...metaData, [name]: value });
//   };

//   const handleFileUpload = (e) => {
//     // Implement file upload logic here
//   };

//   // Function to create contract based on extracted meta data
//   const createContract = () => {
//     // Implement create contract logic here
//     console.log("Creating contract:", metaData);
//   };

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 2500);
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       <div className="flex flex-col lg:flex-row gap-4 p-4 mt-4">
//       <Loader isLoading={loading} />
//         <div className="flex-1 bg-white shadow-lg rounded-lg p-4 overflow-auto">
//           <input type="file" id="file" onChange={handleFileUpload}/>
//           <h2 className="text-xl font-bold mb-4 mt-4">File Name</h2>
//           <div className="bg-zinc-100 p-4 rounded-lg">
//             <h3 className="font-semibold">File Content</h3>

//           </div>
//         </div>
//         <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Extracted Meta Data</h2>
//             <button
//               onClick={createContract}
//               className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
//             >
//               Create Contract
//             </button>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             {/* Display extracted meta data keys and input fields in two columns */}
//             {metaData.map(({ key, value }, index) => (
//               <div key={index}>
//                 <label className="font-semibold">{key}</label>
//                 <input
//                   type="text"
//                   className="form-input block w-8/12 px-2 py-1 border rounded mt-1"
//                   name={key}
//                   value={value}
//                   onChange={(e) => handleInputChange(index, e)}
//                   placeholder={`Enter ${key}`}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileView;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const FileView = () => {
  const [metaData, setMetaData] = useState([
    { key: "first name", value: "" },
    { key: "second name", value: "" },
    { key: "First date", value: "" },
    { key: "second date", value: "" },
    { key: "Description", value: "" },
    { key: "amount", value: "" }
  ]);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Function to handle changes in input fields
  const handleInputChange = (index, e) => {
    const updatedMetaData = [...metaData];
    updatedMetaData[index].value = e.target.value;
    setMetaData(updatedMetaData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  // Function to create contract based on extracted meta data
  const createContract = () => {
    setLoading(true);

    // Construct data object from metaData
    const contractData = {};
    metaData.forEach(({ key, value }) => {
      contractData[key] = value;
    });

    // Make API call using Axios
    axios.post("http://localhost:5000/generate_agreement_form", contractData)
      .then(response => {
        alert('Contract Generated Successfully in assets folder')
        // Handle response if needed
      })
      .catch(error => {
        console.error("API error:", error);
        // Handle error if needed
      })
      .finally(() => {
        setLoading(false);
      });
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
      <div className="flex flex-col lg:flex-row gap-4 p-4 mt-4">
        <Loader isLoading={loading} />
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4 overflow-auto">
          <input type="file" id="file" onChange={handleFileUpload} />
          <h2 className="text-xl font-bold mb-4 mt-4">File Name</h2>
          <div className="bg-zinc-100 p-4 rounded-lg">
            <h3 className="font-semibold">File Content</h3>
            {uploadedFile && (
              <DocViewer documents={[{ uri: URL.createObjectURL(uploadedFile) }]} pluginRenderers={DocViewerRenderers} />
            )}
          </div>
        </div>
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Extracted Meta Data</h2>
            <button
              onClick={createContract}
              className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Create Contract
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Display extracted meta data keys and input fields in two columns */}
            {metaData.map(({ key, value }, index) => (
              <div key={index}>
                <label className="font-semibold">{key}</label>
                <input
                  type="text"
                  className="form-input block w-8/12 px-2 py-1 border rounded mt-1"
                  name={key}
                  value={value}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileView;

