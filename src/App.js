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
import AIReview from './pages/AIReview';
import Login from './pages/Login';
import Execution from './pages/ContractExecution';
import { Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagementDashoard from './pages/ManagementDashoard';
import TableGenerator from './pages/TableGenerator';
import ProtectedRoute from "./components/ProtectedRoute";



function App() {

  return (
    <Router>
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Slide}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/ContractDashboard'  element={<ProtectedRoute><ContractDashboard/></ProtectedRoute>}></Route>
        <Route exact path="/Adhoc"element={<ProtectedRoute><Main /></ProtectedRoute>}></Route>
        <Route exact path="/prompt" element={<PromptInput />}></Route>
        <Route exact path="/fileView" element={<ProtectedRoute><FileView /></ProtectedRoute>}></Route>
        <Route exact path='/ContractReview' element={<ContractReview />}></Route>
        <Route exact path='/negotiation' element={<ContractNegotiation />}></Route>
        <Route exact path='/AiReview' element={<ProtectedRoute><AIReview /></ProtectedRoute>}></Route>
        <Route exact path='/managementdashboard' element={<ManagementDashoard />}></Route>
        <Route exact path='/execution' element={<ProtectedRoute><Execution /></ProtectedRoute>}></Route>
        <Route exact path='/TableGenerator' element={<TableGenerator />}></Route>
      </Routes>
    </Router>

  );
}


export default App;
