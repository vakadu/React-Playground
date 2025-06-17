import { createContext, useContext, useState } from "react";

export default function SoonerToaster() {
  return (
    <ToasterProvider>
      <AppToast />
    </ToasterProvider>
  );
}

function AppToast() {
  const toast = useToast();

  return (
    <div>
      <button onClick={() => toast.success("Added successfully")}>
        Add toast
      </button>
      <button onClick={() => toast.error("deleted successfully")}>
        delete toast
      </button>
    </div>
  );
}

function ToasterProvider({ children }) {
  const [toasts, setToast] = useState([]);  

  function addToast(msg, type) {
    const id = Date.now();
    const newToast = { id, msg, type };
    setToast((prev) => [...prev, newToast])
    setTimeout(() => {
        setToast((prev) => prev.filter((i) => i.id !== id))
    }, 3000)
  }

  function success(msg) {
    addToast(msg, 'success')
  }

  function error(msg) {
    addToast(msg, 'error')
  }

  return (
    <SoonerContext.Provider value={{ success, error }}>
      {children}
      {toasts.length > 0 && (
        <div style={{ position: "absolute", bottom: 0, right: 0 }}>
          {toasts.map((toast) => {
            return <div key={toast.id}>{toast.msg}</div>;
          })}
        </div>
      )}
    </SoonerContext.Provider>
  );
}

const SoonerContext = createContext(null);

function useToast() {
  const context = useContext(SoonerContext);
  if (context === undefined) {
    throw new Error("context not defined");
  }
  return context;
}
