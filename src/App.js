// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import PromptInput from './pages/PromptInput';
import FileView from './pages/FileView';

function App() {
 

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route exact path="/prompt" element={<PromptInput />}></Route>
        <Route exact path="/fileView" element={<FileView />}></Route>
      </Routes>
    </Router>

  );
}


export default App;
