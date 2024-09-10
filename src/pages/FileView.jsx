import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const FileView = () => {
  const [metaData, setMetaData] = useState([
    { key: "party 1", value: "" },
    { key: "party 2", value: "" },
  ]);

  const [additionalData, setAdditionalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [checkResult, setCheckResult] = useState(null);


  // Function to handle changes in input fields
  const handleInputChange = (index, e) => {
    const updatedMetaData = [...metaData];
    updatedMetaData[index].value = e.target.value;
    setMetaData(updatedMetaData);
  };

  const handleAdditionalInputChange = (index, e) => {
    const updatedAdditionalData = [...additionalData];
    updatedAdditionalData[index].value = e.target.value;
    setAdditionalData(updatedAdditionalData);
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
      setFile(data);
    });
    setUploadedFile(e.target.files[0]);
    setFileName(file.name);
  };

  const handleFileUpload1 = async (e) => {
    const files = Array.from(e.target.files);
    const filePromises = files.map(async (file) => {
      return new Promise((resolve, reject) => {
        getBase64(file)
          .then((data) => {
            resolve({ name: file.name, data });
          })
          .catch((err) => {
            reject(err);
          });
      });
    });

    try {
      const fileData = await Promise.all(filePromises);
      console.log(fileData);
      setFile(fileData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const obj = {
      Template_binary: file[1]?.data.split(",")[1],
      proposal_binary: file[0]?.data.split(",")[1],
    };

    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "https://contractflow-backend.azurewebsites.net/upload_doc_1",
      data: obj,
    };

    await axios(config)
      .then(async (res) => {
        console.log(res);
        const missedJsonResponse = res.data.missed_json;
        const parsedMissedJson = JSON.parse(missedJsonResponse);

        const additionalFields = Object.keys(parsedMissedJson).map((key) => ({
          key,
          value: "",
        }));

        setAdditionalData(additionalFields);
        setLoading(false);
        toast.success(
          "Contents have been brought successfully from proposal. Please fill the missed content."
        );
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error in uploading the file. Please try again.");
      });
  };

  // Function to create contract based on extracted meta data
  const createContract = () => {
    setLoading(true);

    // Construct data object from metaData
    const contractData = {};
    metaData.forEach(({ key, value }) => {
      contractData[key] = value;
    });

    // Add additional data to contractData
    additionalData.forEach(({ key, value }) => {
      contractData[key] = value;
    });

    // Make API call using Axios
    axios
      .post("https://contractflow-backend.azurewebsites.net/generate_agreement_form", contractData)
      .then((response) => {
        emailjs
          .send(
            "service_1rq9qjf",
            "template_8u7vab4",
            {
              to_email: "yajasmenon2913@gmail.com", // Replace with recipient's email
              from_email: "yajasmenon@gmail.com", // Replace with your email
              subject: "Contract Generated Successfully",
              message:
                "Your contract has been generated successfully. Please go for review.",
            },
            "lsezoTTwZcd7bEFnW"
          )
          .then(() => {
            toast.success(
              "An email has been sent to the reviewer requesting to review and approve the SOW contract document."
            );
          })
          .catch((error) => {
            console.error(error);
          });

        // Handle response if needed
        console.log("Contract Generated Successfully");
        // Handle response if needed
      })
      .catch((error) => {
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

  const handleCheck = () => {
    const randomResponse = Math.random() < 0.5 ? 'yes' : 'no';
    console.log(randomResponse);
    setCheckResult(randomResponse);
  };

  const handleGetFiles = async () => {
    const filePath = 'modified_template.docx'; // Replace with the actual path of the file you want to download
    const downloadUrl = `https://contractflow-backend.azurewebsites.net/get-files/${filePath}`;

    try {
      const response = await axios.get(downloadUrl, {
        responseType: 'blob', 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };


  return (
    <div>
      <Navbar />
      <div>
        <Loader isLoading={loading} />


        <div className="flex mx-10 my-4">
          <input
            type="text"
            placeholder="Is the proposal Approved?"
            className="form-input block px-2 py-1 border rounded w-56"
          />
          <button
            onClick={handleCheck}
            className="mx-2 bg-purple hover:bg-dark-purple font-sans font-medium text-white px-4 py-2 rounded-lg"
          >
            Check
          </button>
        </div>


        <hr className="h-px my-4 mx-8 bg-gray-200 border-0 dark:bg-gray-700" />
        {checkResult === 'yes' && (
          <div>
            <input
              type="file"
              id="file"
              onChange={handleFileUpload1}
              multiple
              className="ml-8 mt-2 rounded-lg border-2 border-gray-300 p-2 w-48"
            />
            <button
              onClick={handleFileSubmit}
              className="mx-2 bg-purple hover:bg-dark-purple font-sans font-medium text-white px-4 py-2 rounded-lg mt-4"
            >
              Proposal to SoW
            </button>
            <button 
            onClick={handleGetFiles}
            className="mx-2 bg-purple hover:bg-dark-purple font-sans font-medium text-white px-4 py-2 rounded-lg mt-4">
              Download File
            </button>
            <div className="flex flex-col lg:flex-row gap-4 p-4 mt-12">
              <div className="flex-1 bg-white shadow-lg rounded-lg p-4 overflow-auto">
                <input type="file" id="file" onChange={handleFileUpload} className="mt-2 rounded-lg border-2 border-gray-300 p-2 w-48" />

                <h2 className="text-xl font-bold mb-4 mt-4">{fileName}</h2>
                <div className="bg-zinc-100 p-4 rounded-lg">
                  <h3 className="font-semibold">File Content</h3>
                  {uploadedFile && (
                    <iframe src={file} width="100%" height="500px" />
                  )}
                </div>
              </div>
              <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold"> Meta Data</h2>
                  <button
                    onClick={createContract}
                    className="bg-purple hover:bg-dark-purple font-sans font-medium text-white px-4 py-2 rounded-lg"
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
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                <h1 className="text-2xl font-bold mb-2 ">Missed Content:</h1>
                <div className="grid grid-cols-2 gap-4">
                  {/* Display additional meta data keys and input fields in two columns */}
                  {additionalData.map(({ key, value }, index) => (
                    <div key={index}>
                      <label className="font-semibold">{key}</label>
                      <input
                        type="text"
                        className="form-input block w-8/12 px-2 py-1 border rounded mt-1"
                        name={key}
                        value={value}
                        onChange={(e) => handleAdditionalInputChange(index, e)}
                        placeholder={`Enter ${key}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileView;
