"use client";

import { useDeferredValue } from "react";
import { useTransition } from "react";
import { useMemo } from "react";
import { useEffect, useState } from "react";

export default function AutoComplete3() {
  const bigList = useMemo(() => {
    return Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      title: `Product ${i}`,
      desc: `This is product number ${i}`,
    }));
  }, []);

  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const defVal = useDeferredValue(value);
  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   setResults(bigList)
  // }, [])

  function handleChange(val) {
    setValue(val);
    startTransition(() => {
      const filter = bigList.filter((item) =>
        item.title.toLowerCase().includes(val.toLowerCase()),
      );
      setResults(filter);
    });
  }
  console.log(results);

  return (
    <div className="p-10">
      <input
        className="h-11 rounded-md border border-neutral-500 px-4"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="text-sm text-neutral-500">
        typing: <code>{value}</code> | deferred: <code>{defVal}</code>
      </div>
      {isPending && (
        <div className="text-sm text-blue-500">Filtering large dataset...</div>
      )}
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
