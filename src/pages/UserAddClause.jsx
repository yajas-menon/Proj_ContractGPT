import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function UserAddClause() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleAddClause = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/add_clause', {
        title,
        content,
      });
      alert('Clause added successfully');
    } catch (err) {
      console.error('Error adding clause', err);
    }
  };

  const handleSkip = () => {
    navigate('/select_clauses');
  };

  return (
    <div>
        <Navbar/>
    <div className="max-w-2xl mt-20 mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Your Clause</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
          Clause Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter clause title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="content">
          Clause Content
        </label>
        <textarea
          id="content"
          placeholder="Enter clause content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 h-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>

      <button
        onClick={handleAddClause}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
        Add Clause
      </button>
      <button
        onClick={handleSkip}
        className=" w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors mt-2"
        >
        Skip
      </button>
    </div>
          </div>
  );
}
