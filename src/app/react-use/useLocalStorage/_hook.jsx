import { useState } from "react";

export function useLocalStorage(key, initial) {
  const [value, setVal] = useState(() => {
    try {
        const v = localStorage.getItem(key);
        return v ? v : initial
    } catch (error) {
        
    }
  })

  const setValue = (v) => {
    localStorage.setItem(key, JSON.stringify(v));
    setVal(v)
  };

  const remove = () => {
    localStorage.removeItem(key);
    setVal(undefined)
  };

  return [value, setValue, remove];
}
