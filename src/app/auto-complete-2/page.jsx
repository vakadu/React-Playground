"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "./_hooks/use-debounce";

export default function AutoComplete2() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults("");
  }, []);

  const fetchResults = async (val) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${val}`,
      );
      if (!response.ok) {
        alert("Not ok");
        return;
      }
      const data = await response.json();
      setResults(data.products);
    } catch (error) {
      // alert(error.message)
    }
  };

  const debouncedFun = useDebounce(fetchResults, 500);

  const handleChange = (val) => {
    setValue(val);
    debouncedFun(val);
  };

  return (
    <div className="p-10">
      <input
        className="h-11 rounded-md border border-neutral-500 px-4"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      {results.map((result) => {
        return (
          <div key={result.id}>
            <div>{result.title}</div>
          </div>
        );
      })}
    </div>
  );
}
