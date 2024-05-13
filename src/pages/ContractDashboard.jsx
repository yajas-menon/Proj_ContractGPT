import React from "react";
import Navbar from "../components/Navbar";
import Stepper from "../components/Stepper";
import CardComponent from "../components/CardComponent";
import GraphComponent from "../components/GraphComponent";
import GraphComponent2 from "../components/GraphComponent2";

const ContractDashboard = () => {
  return (
    <div>
      <Navbar />
      <main class="p-4 mx-10 my-4">
        <h1 className="text-3xl font-bold">Operational Dashboard for Contracts</h1>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        <Stepper />
        <CardComponent/>
        <GraphComponent/>
        <GraphComponent2/>
      </main>
    </div>
  );
};

export default ContractDashboard;
