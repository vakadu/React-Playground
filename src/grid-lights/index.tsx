import React, { useEffect, useState } from "react";

const GridLights = () => {
  const table = new Array(9).fill("").map((_, i) => i);
  const [newIndices, setNewIndices] = useState(new Set());
  const [isUnloading, setIsUnloading] = useState(false);

  useEffect(() => {
    if (newIndices.size === 3 && !isUnloading) {
      setIsUnloading(true);
      unload();
    }
  }, [newIndices.size, isUnloading]);

  function unload() {
    const keys = Array.from(newIndices);

    function removeKey() {
      if (keys.length > 0) {
        const currKey = keys.shift();
        setNewIndices((prev) => {
          const tempIndices = new Set(prev);
          tempIndices.delete(currKey);
          return tempIndices;
        });
        setTimeout(removeKey, 500);
      } else {
        setIsUnloading(false);
      }
    }

    removeKey();
  }

  const handleClick = (i) => {
    const tempIndices = new Set(newIndices);
    tempIndices.add(i);
    setNewIndices(tempIndices);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        margin: "0 auto",
        maxWidth: "calc(54px*3)",
        gap: 12,
      }}
    >
      {table.map((_, i) => {
        const selected = newIndices.has(i);
        return (
          <button
            key={i}
            style={{
              width: 52,
              height: 52,
              border: "1px solid",
              backgroundColor: selected ? "green" : "white",
            }}
            disabled={isUnloading}
            onClick={() => handleClick(i)}
          ></button>
        );
      })}
    </div>
  );
};

export default GridLights;
