// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import PromptInput from './pages/PromptInput';
import FileView from './pages/FileView';
import ContractReview from './pages/ContractReview';
import ContractNegotiation from './pages/ContractNegotiation';
import ContractDashboard from './pages/ContractDashboard';
// import ClauseReview from './pages/ClauseReview';
import PowerBiReport from './pages/PowerBiReport';
import AIReview from './pages/AiReview';
import Login from './pages/Login';
import Execution from './pages/ContractExecution';
import { Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <Router>
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Slide}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/ContractDashboard' element={<ContractDashboard />}></Route>
        <Route exact path="/Adhoc" element={<Main />}></Route>
        <Route exact path="/prompt" element={<PromptInput />}></Route>
        <Route exact path="/fileView" element={<FileView />}></Route>
        <Route exact path='/ContractReview' element={<ContractReview />}></Route>
        <Route exact path='/negotiation' element={<ContractNegotiation />}></Route>
        <Route exact path='/AiReview' element={<AIReview />}></Route>
        <Route exact path='/PowerBiReport' element={<PowerBiReport />}></Route>
        <Route exact path='/execution' element={<Execution />}></Route>
      </Routes>
    </Router>

  );
}


export default App;
