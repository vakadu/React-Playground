import React, { createContext, useContext } from "react";

const QueryContext = createContext();

const QueryClientProvider = ({ children, value }) => {
  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
};

export const useQueryClient = () => {
  const client = useContext(QueryContext);
  return client;
};

export default QueryClientProvider;
