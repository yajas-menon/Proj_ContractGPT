import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Navbar from "../components/Navbar";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ direction: "rtl" }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["clean"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
  ],
};

const TextEditor = () => {
  const [value, setValue] = useState("");
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");

  // Fetch vendors when component mounts
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("https://proj-contract-gpt-server.vercel.app/api/auth/get_vendors");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        alert("Failed to fetch vendors.");
      }
    };

    fetchVendors();
  }, []);

  // Function to handle sending the document via email
  const handleSendDocument = async () => {
    if (!selectedVendor) {
      alert("Please select a vendor from the dropdown.");
      return;
    }

    const documentData = {
      content: value,
      recipientEmail: selectedVendor,
    };

    try {
      // Send document content and recipient email to backend
      await axios.post("https://proj-contract-gpt-server.vercel.app/api/auth/send-email", documentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Document sent successfully via email!");
    } catch (error) {
      console.error("Error sending document:", error);
      alert("Failed to send the document.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />

      <div className="flex w-full h-full flex-grow">
        <div className="w-1/2 h-full p-4">
          <div className="h-full overflow-y-auto">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="h-full"
              modules={modules}
            />
          </div>
        </div>

        <div className="w-1/2 h-full p-4 overflow-y-auto border-l">
          <div className="h-full" dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      </div>

      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

      {/* Dropdown to select vendor */}
      <div className="w-full flex flex-col items-center mb-4">
        <label htmlFor="vendor-dropdown" className="block mb-2 text-lg font-semibold">
          Select a vendor:
        </label>
        <select
          id="vendor-dropdown"
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
          className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select a Vendor --</option>
          {vendors.map((vendor) => (
            <option key={vendor._id} value={vendor.email}>
              {vendor.vendorName} ({vendor.email})
            </option>
          ))}
        </select>
      </div>

      <div className="w-full flex justify-center mb-4">
        <button
          onClick={handleSendDocument}
          className="w-48 p-2 bg-purple hover:bg-dark-purple font-sans font-medium text-white rounded-lg"
        >
          Send Document
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
