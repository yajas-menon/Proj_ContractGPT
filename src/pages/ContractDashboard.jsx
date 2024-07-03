import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import CardComponent from "../components/CardComponent";
import GraphComponent from "../components/GraphComponent";
import GraphComponent2 from "../components/GraphComponent2";
import { useNavigate } from "react-router-dom";
import Chat from "../components/ChatBot";

const ContractDashboard = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <main className="p-4 mx-10 my-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium">
            Operational Dashboard for Contracts
          </h1>
            <button onClick={()=>Navigate('/managementdashboard')} className="bg-purple hover:bg-dark-purple font-sans font-medium text-white px-4 py-2 rounded-lg">
              Management Dashboard
            </button>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <Stepper />
        <CardComponent />
        <GraphComponent />
        <GraphComponent2 />
      </main>
      <div>
        <Chat />
      </div>
    </div>
  );
};

export default ContractDashboard;