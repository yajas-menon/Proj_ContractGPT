import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";

const Main = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleQuestionChange = (event) => {
      setQuestion(event.target.value);
    };
  
    const handleQuestionSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      try{
        const apiResponse = await fetchAPI(question);
        setResponse(apiResponse.answer);
        setLoading(false);
      }catch(error){
        setLoading(false);
        setResponse(error.message);
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
    {loading ? (<Loader/> ):(
      <div className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col w-full md:w-2/5 p-8">
        <h1 className="text-4xl font-bold mb-8 text-center md:text-left">
          Ask a question
        </h1>
        <form onSubmit={handleQuestionSubmit} className="flex flex-col">
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Type your question here..."
            className="p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-4 bg-black text-white rounded-md hover:bg-slate-900"
          >
            Submit
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-left">Response:</h2>
        
              <div className="bg-white p-4 rounded-md border border-gray-300 h-44 mb-4 overflow-y-auto scroll-smooth max-h-300">
              <p className='text-semibold text-lg'>{response}</p>
            </div>
          
        </div>
      </div>
      <div className="w-full md:w-3/5 h-screen overflow-y-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-8 ">Supporting Documents</h2>
          <div className="bg-white p-4 rounded-md border border-gray-300 h-96"></div>
        </div>
      </div>
    </div>
    ) }
    </div>
  );
};


const fetchAPI= async (question)=>{
    try{
      const res = await axios.post("http://127.0.0.1:5000/get_answers", {question});
      return res.data;
    }catch(error){
      throw new Error("An Error occurred while fetching the data.");
    }
  };


export default Main;