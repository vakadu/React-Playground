import { useEffect, useState } from "react";
import { useToast } from "./context";

export default function Ui() {
  const { subscribe } = useToast();
  const [newToasts, setNewToasts] = useState([]);

  useEffect(() => {
    const update = (newUpdate) => {
      setNewToasts([...newUpdate]);
    };

    subscribe(update);
  }, []);

  return (
    <div>
      {newToasts.map((toast, i) => {
        return <div key={i}>{toast.msg}</div>;
      })}
    </div>
  );
}
