// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import PromptInput from './pages/PromptInput';
import FileView from './pages/FileView';
import ContractReview from './pages/ContractReview';
import ContractNegotiation from './pages/ContractNegotiation';

function App() {
 

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route exact path="/prompt" element={<PromptInput />}></Route>
        <Route exact path="/fileView" element={<FileView />}></Route>
        <Route exact path='/ContractReview' element={<ContractReview/>}></Route>
        <Route exact path='/negotiation' element={<ContractNegotiation/>}></Route>
      </Routes>
    </Router>

  );
}


export default App;
