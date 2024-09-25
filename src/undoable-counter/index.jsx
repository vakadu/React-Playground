import { useState } from "react";

function mathOperation(sign, counter) {
  switch (sign) {
    case "/":
      return counter / 2;
    case "-":
      return counter - 1;
    case "+":
      return counter + 1;
    case "*":
      return counter * 2;
    default:
      return counter;
  }
}

export default function UndoableCounter() {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);

  function updateCounter(sign) {
    let oldCounter = counter;
    let newCounter = mathOperation(sign, counter);
    setCounter(newCounter);
    setData([{ operation: sign, old: oldCounter, new: newCounter }, ...data]);
  }

  function undo() {
    const [latest, ...old] = data;
    setCounter(latest.old);
    setData(old);
    setUndoHistory([latest, ...undoHistory]);
  }

  function redo() {
    const [latest, ...old] = undoHistory;
    setCounter(latest.new);
    setData([latest, ...data]);
    setUndoHistory([old]);
  }

  function reset() {
    setCounter(0);
    setData([]);
    setUndoHistory([]);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <button onClick={() => updateCounter("/")}>/2</button>
        <button onClick={() => updateCounter("-")}>-1</button>
        <div>{counter}</div>
        <button onClick={() => updateCounter("+")}>+1</button>
        <button onClick={() => updateCounter("*")}>*2</button>
      </div>
      <div>
        <table>
          <thead>
            <th>Operation</th>
            <th>Old</th>
            <th>New</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.operation}</td>
                  <td>{item?.old}</td>
                  <td>{item?.new}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
