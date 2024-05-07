import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function ClauseReview() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [expandedComments, setExpandedComments] = useState(false);
  const [expandedRevisions, setExpandedRevisions] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const toggleExpandComments = () => {
    setExpandedComments(!expandedComments);
  };

  const toggleExpandRevisions = () => {
    setExpandedRevisions(!expandedRevisions);
  };

  const docs = [
    { uri: require("../assets/SOW_Equiom_May_24, 2021.pdf") }, // Local File
  ];

  return (
    <div>
      <Navbar />
      <body className="bg-zinc-100 dark:bg-zinc-800">
        <div className="flex flex-col md:flex-row h-screen">
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white dark:bg-zinc-700 shadow-lg p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <input type="file" id="file" onChange={handleFileUpload} />
                <button className="px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-md">
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
            <div className="mb-4">
              <h2 className="text-lg font-semibold dark:text-white">
                Comments
              </h2>
              <div className="mt-2 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                <p
                  className={`text-sm ${
                    expandedComments ? "" : "truncate"
                  } text-zinc-800 dark:text-zinc-200`}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque et tortor quis sapien auctor finibus. Curabitur
                  augue ligula, placerat ac.
                </p>
                <button
                  onClick={toggleExpandComments}
                  className="mt-2 px-3 py-1 bg-gray-900 hover:bg-gray-700 text-white text-xs rounded-md"
                >
                  {expandedComments ? "Collapse" : "Expand"}
                </button>
                <div className="flex">
                  <button className="mt-2 px-3 py-1 bg-orange-500 text-white text-xs rounded-md">
                    Ai Revise
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold dark:text-white">
                Revisions
              </h2>
              <div className="mt-2 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                <p
                  className={`text-sm ${
                    expandedRevisions ? "" : "truncate"
                  } text-zinc-800 dark:text-zinc-200`}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque et tortor quis sapien auctor finibus. Curabitur
                  augue ligula, placerat ac.
                </p>
                <button
                  onClick={toggleExpandRevisions}
                  className="mt-2 px-3 py-1 bg-gray-900 hover:bg-gray-700 text-white text-xs rounded-md"
                >
                  {expandedRevisions ? "Collapse" : "Expand"}
                </button>
                <div className="flex">
                  <button className="mt-2 px-3 py-1 bg-orange-500 text-white text-xs rounded-md">
                   Ai Revise
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
