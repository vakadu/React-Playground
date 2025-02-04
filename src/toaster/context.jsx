import { createContext, useContext } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children, value }) => {
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("No context defined");
  }

  return context;
};
