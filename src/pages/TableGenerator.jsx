import React, { useState } from 'react';
import axios from 'axios';

const TableGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [table, setTable] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate-table', { prompt });
      console.log(response.data);
      setTable(response.data.table);
      setError('');
    } catch (err) {
      setError('Error generating table. Please try again.');
      setTable('');
    }
  };

  const renderTable = () => {
    if (!table) return null;
    const rows = table.split('\n').filter(row => row.trim() !== '');
    const header = rows[0].split('|').filter(cell => cell.trim() !== '');
    const data = rows.slice(1).map(row => row.split('|').filter(cell => cell.trim() !== ''));

    return (
      <table border="1">
        <thead>
          <tr>
            {header.map((cell, index) => (
              <th key={index}>{cell.trim()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell.trim()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Generate Table from Prompt</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </label>
        <button type="submit">Generate</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {renderTable()}
    </div>
  );
};

export default TableGenerator;
