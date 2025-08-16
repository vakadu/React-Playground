'use client'

import { useState } from "react";

export default function UndoRedo() {
  const [value, setValue] = useState("");
  const [undo, setUndo] = useState([]);
  const [redo, setRedo] = useState([]);
  const [key, setKey] = useState();
  console.log(undo, redo);
  

  function handleEnter(e) {
    if (e.code === "Enter" && Boolean(value)) {
      setUndo((prev) => [...prev, value]);
      setKey(value);
      setValue("");
    }
  }

  function onUndo() {
    if(undo.length > 0) {
        const temp = [...undo];
        const popped = temp.pop();
        setUndo(temp);
        setKey(temp[temp.length-1]);
        setRedo((prev) => [...prev, popped])
    }
  }

  function onRedo() {
    if(redo.length > 0) {
        const temp = [...redo];
        const popped = temp.pop();
        setRedo(temp);
        setKey(popped);
        setUndo((prev) => [...prev, popped])
    }
  }

  function reset() {
    setKey('');
    setRedo([]);
    setUndo([]);
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button disabled={undo.length <= 0} onClick={onUndo}>undo</button>
        <button disabled={redo.length <= 0} onClick={onRedo}>redo</button>
        <button onClick={reset}>reset</button>
      </div>
      <div>{key}</div>
    </div>
  );
}
