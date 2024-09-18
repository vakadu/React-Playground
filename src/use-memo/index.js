import React, { useState, useMemo } from "react";
import { initialItems } from "../utils";

export default function UseMemo(props) {
  const [timer, setTimer] = useState(0);
  const [items] = useState(initialItems);

  const isSelected = useMemo(
    () =>
      items.find((item) => {
        return item.id === timer;
      }),
    [timer]
  );

  return (
    <div className="App">
      <div>{isSelected.id}</div>
      <div>{timer}</div>
      <button onClick={() => setTimer(timer + 1)}>increment</button>
    </div>
  );
}
