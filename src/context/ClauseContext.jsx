import React, { createContext, useState } from "react";

// Create a context
export const ClauseContext = createContext();

// Create a provider component
export const ClauseProvider = ({ children }) => {
  const [selectedClauses, setSelectedClauses] = useState([]);

  const addClause = (clause) => {
    setSelectedClauses((prevClauses) => [...prevClauses, clause]);
  };

  return (
    <ClauseContext.Provider value={{ selectedClauses, addClause }}>
      {children}
    </ClauseContext.Provider>
  );
};
