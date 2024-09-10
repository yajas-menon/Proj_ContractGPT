// Stepper.js
import React, { useState } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";

const Stepper = () => {
  const steps = ["Initiate", "Creation", "Review", "Approval"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [showOptions, setShowOptions] = useState(null);

  return (
    <>
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
            onMouseEnter={() => setShowOptions(i + 1)}
            onMouseLeave={() => setShowOptions(null)}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
            {showOptions === i + 1 && (
              <div className="options">The contract is {step}</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-end justify-end mr-40 mt-4">
        {!complete && (
          <button
            className="bg-purple hover:bg-dark-purple px-4 py-2 rounded-lg text-white font-semibold"
            onClick={() => {
              currentStep === steps.length
                ? setComplete(true)
                : setCurrentStep((prev) => prev + 1);
            }}
          >
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </>
  );
};

export default Stepper;
