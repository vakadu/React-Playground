"use client";

import { useRef } from "react";

const ROWS = 10;
const COLS = 10;

export default function SelectableGrids() {
  const draggableRef = useRef();
  const selectableRef = useRef();
  return (
    <div
      ref={draggableRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={selectableRef}
        style={{ position: "absolute", border: "1px solid" }}
      ></div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          border: "1px solid",
          width: 400,
          height: 400,
        }}
      >
        {Array.from({ length: ROWS * COLS }, (_, index) => {
          return <div key={index} style={{ border: "1px solid" }}></div>;
        })}
      </div>
    </div>
  );
}
