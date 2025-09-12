"use client";

import { useEffect } from "react";
import { useState } from "react";

export default function Page() {
  const [grid, setGrid] = useState(new Array(9).fill(""));
  const [stack, setStack] = useState([]);

  useEffect(() => {
    if (grid.length === stack.length) {
      for (let index = stack.length - 1; index >= 0; index--) {
        const element = stack[index];
        setTimeout(
          () => {
            setGrid((prev) => {
              const temp = [...prev];
              temp[element] = "";
              return temp;
            });
          },
          (stack.length - 1 - index) * 200,
        );
      }
      // Clear the stack after all animations finish
      setTimeout(() => {
        setStack([]);
      }, stack.length * 200);
    }
  }, [stack.length]);

  const handleClick = (i) => {
    setGrid((prev) => {
      const temp = [...prev];
      temp[i] = "selected";
      return temp;
    });
    setStack((prev) => [...prev, i]);
  };

  return (
    <div className="mx-auto grid grid-cols-[repeat(3,56px)] gap-2">
      {grid.map((_, i) => {
        return (
          <div
            style={{ backgroundColor: grid[i] ? "green" : "white" }}
            onClick={() => handleClick(i)}
            className="h-14 w-14 border"
            key={i}
          ></div>
        );
      })}
    </div>
  );
}
