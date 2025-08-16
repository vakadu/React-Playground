import {
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback,
} from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  console.log(toasts);

  const addToast = (msg, type) => {
    const id = Date.now();
    const newToast = { msg, id, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  //   useEffect(() => {
  //     if (toasts.length > 0) {
  //       //   const timer = setTimeout(() => {
  //       //     removeToast(toasts[0].id);
  //       //   }, 3000);
  //       //   return () => clearTimeout(timer);
  //       //   toasts.forEach((toast, index) => {
  //       //     const id = toast.id;
  //       //     setTimeout(() => {
  //       //       removeToast(id);
  //       //     }, (index + 1) * 3000);
  //       //   });
  //     }
  //   }, [removeToast, toasts]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("no context");
  }
  return context;
};
