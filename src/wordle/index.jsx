import { useEffect, useState } from "react";

const rows = 6;
const columns = 5;

export default function Wordle() {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [board, setBoard] = useState(
    Array.from({ length: rows }, () => Array(columns).fill(""))
  );
  console.log(board);

  function handleKeyDown(event) {
    // let str = 'abcdefghijklmnopqrstuvwxyz'.split(''), key =event.key.toLowerCase();
    let code = event.keyCode, key = event.key;
    if (code >= 65 && code <= 90) {
      if(currentRow < rows && currentColumn < columns) {
        const updated = [...board];
        updated[currentRow][currentColumn] = key.toUpperCase();
        setBoard(updated);
        setCurrentColumn((prev) => prev + 1)
      }
    }

    if (event.key === "Enter") {
      
      setCurrentColumn(0);
      setCurrentRow((prev) => prev + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board, currentColumn, currentRow]);

  return (
    <div style={{ margin: 20 }}>
      {board.map((row, idx) => {
        return (
          <div key={idx} style={{ display: "flex" }}>
            {row.map((column, i) => {
              return (
                <div
                  key={i}
                  style={{ width: 52, height: 52, border: "1px solid", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >{column}</div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
