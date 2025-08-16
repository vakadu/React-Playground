import { createContext, useContext } from "react";

export const AccordianContext = createContext(null);
export const AccordianItemContext = createContext(null);

export const useAccordian = () => {
  const context = useContext(AccordianContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
};

export const useAccordianItem = () => {
  const context = useContext(AccordianItemContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
};
