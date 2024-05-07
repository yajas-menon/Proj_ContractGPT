import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ContractReview = () => {
  const [metaData, setMetaData] = useState([
    { key: "first name", value: "" },
    { key: "second name", value: "" },
    { key: "First date", value: "" },
    { key: "second date", value: "" },
    { key: "Description", value: "" },
    { key: "amount", value: "" },
    { key: "Enter the response here to fill the document", value: "" }
  ]);

  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
 
  const navigate = useNavigate();
  // Function to handle changes in input fields
 

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };


 



  const docs = [
    
    { uri: require("../assets/SOW_Equiom_May_24, 2021.pdf") }, // Local File
  ];


  return (
    <div>
      <Navbar />
      <h2 className="text-3xl font-bold mx-10 my-4 p-4">Review with Base template</h2>
      <hr className="h-px mx-10 my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      <div className="flex flex-col lg:flex-row gap-4 p-4 mt-12">
        <Loader isLoading={loading} />
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4 overflow-auto">
          <input type="file" id="file" onChange={handleFileUpload} />
          
          <div className="bg-zinc-100 p-4 rounded-lg mb-4 mt-4">
            <h3 className="font-semibold font-2xl">Base Template</h3>
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
          </div>
        </div>
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Generated file</h2>
            
          </div>
         
          <div className="bg-zinc-100 p-4 rounded-lg">
            <h3 className="font-semibold">File Content</h3>
            {uploadedFile && (
              <DocViewer documents={[{ uri: URL.createObjectURL(uploadedFile) }]} pluginRenderers={DocViewerRenderers} />
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ContractReview;

