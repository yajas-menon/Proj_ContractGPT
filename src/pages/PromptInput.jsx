import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

function PromptInput() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/generate_agreement",
        {
          prompt: inputValue,
        }
      );

      console.log(response.data);
      alert("Contract Generated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to generate contract");
    }
    setInputValue("");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const docs = [
    {
      uri: require("../assets/agreement.docx"),
    }, // Local File
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <Loader isLoading={loading} />
        <h1 className="text-4xl font-bold mt-8">
          Contract Generation Using Prompt
        </h1>

        <textarea
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="h-96 w-6/12 px-4 py-12 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-700 my-10"
          placeholder="Enter your prompt here"
        />

        <button
          onClick={handleSubmit}
          className="w-32 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default PromptInput;
