"use client";

import { useState, useRef } from "react";
import HoverOnly from "./hover-only-seleted";

export default function MultiCellSelection() {
  const [selection, setSelection] = useState({
    start: null,
    end: null,
  });

  const isDragging = useRef(false);

  function handleMouseDown(row, col) {
    isDragging.current = true;
    setSelection({ start: [row, col], end: [row, col] });
  }

  function handleMouseEnter(row, col) {
    if (isDragging.current) {
      setSelection((prev) => ({
        ...prev,
        end: [row, col],
      }));
    }
  }

  function handleMouseUp() {
    isDragging.current = false;
  }

  function isSelected(row, col) {
    const { start, end } = selection;
    if (!start || !end) return false;

    const [r1, c1] = start;
    const [r2, c2] = end;

    const rowMin = Math.min(r1, r2);
    const rowMax = Math.max(r1, r2);
    const colMin = Math.min(c1, c2);
    const colMax = Math.max(c1, c2);

    return row >= rowMin && row <= rowMax && col >= colMin && col <= colMax;
  }

  return (
    <div style={{display: 'flex', gap: 24}}>
    <div
      style={{ margin: 10 }}
      onMouseUp={handleMouseUp}
    >
      {Array.from({ length: 10 }, (_, row) => (
        <div style={{ display: "flex" }} key={row}>
          {Array.from({ length: 10 }, (_, col) => {
            const selected = isSelected(row, col);
            return (
              <div
                onMouseDown={() => handleMouseDown(row, col)}
                onMouseEnter={() => handleMouseEnter(row, col)}
                key={col}
                style={{
                  width: 52,
                  height: 52,
                  border: "1px solid black",
                  backgroundColor: selected ? "lightblue" : "white",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
    <HoverOnly/>
    </div>
  );
}
