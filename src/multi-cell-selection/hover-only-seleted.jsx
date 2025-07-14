import { useRef, useState } from "react";

export default function HoverOnly() {
  const [state, setState] = useState(new Set());
  const isDragging = useRef(false);

  function handleMouseUp() {
    isDragging.current = false;
  }

  function handleMouseDown(row, col) {
    const key = `${row}_${col}`;
    isDragging.current = true;
    setState((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleMouseEnter(row, col) {
    if (!isDragging.current) {
      return;
    }

    const key = `${row}_${col}`;
    setState((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div style={{ margin: 10 }} onMouseUp={handleMouseUp}>
      {Array.from({ length: 10 }, (_, row) => (
        <div style={{ display: "flex" }} key={row}>
          {Array.from({ length: 10 }, (_, col) => {
            const selected = state.has(`${row}_${col}`);
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
  );
}
