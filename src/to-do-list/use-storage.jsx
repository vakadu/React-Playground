import { useCallback, useEffect, useState } from "react";

export function useStorage(key, initialData) {
  const [data, setData] = useState(initialData);
  const [value, setValue] = useState("");

  useEffect(() => {
    const localData = localStorage.getItem(key);
    if (localData) {
      setData(JSON.parse(localData));
    }
  }, []);

  const handleDelete = useCallback((id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  }, [data])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const payload = {
      id: Date.now(),
      text: value,
      status: "pending",
    };
    const tempData = [...data, payload];
    setData(tempData);
    localStorage.setItem(key, JSON.stringify(tempData));
    setValue("");
  }, [data, value])

  const handleCheckbox = useCallback((id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === "completed" ? "pending" : "completed",
        };
      }

      return item;
    });
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  }, [data])

  const clearAll = useCallback(() => {
    setData([]);
    localStorage.clear()
  }, [data])

  return {
    value,
    setValue,
    data,
    handleDelete,
    handleSubmit,
    handleCheckbox,
    clearAll,
  };
}
