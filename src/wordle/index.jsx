// import { useEffect, useState } from "react";

// const rows = 6;
// const columns = 5;

// export default function Wordle() {
//   const [currentRow, setCurrentRow] = useState(0);
//   const [currentColumn, setCurrentColumn] = useState(0);
//   const [board, setBoard] = useState(
//     Array.from({ length: rows }, () => Array(columns).fill(""))
//   );
//   console.log(board);

//   function handleKeyDown(event) {
//     // let str = 'abcdefghijklmnopqrstuvwxyz'.split(''), key =event.key.toLowerCase();
//     let code = event.keyCode, key = event.key;
//     if (code >= 65 && code <= 90) {
//       if(currentRow < rows && currentColumn < columns) {
//         const updated = [...board];
//         updated[currentRow][currentColumn] = key.toUpperCase();
//         setBoard(updated);
//         setCurrentColumn((prev) => prev + 1)
//       }
//     }

//     if (event.key === "Enter") {
      
//       setCurrentColumn(0);
//       setCurrentRow((prev) => prev + 1)
//     }
//   }

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [board, currentColumn, currentRow]);

//   return (
//     <div style={{ margin: 20 }}>
//       {board.map((row, idx) => {
//         return (
//           <div key={idx} style={{ display: "flex" }}>
//             {row.map((column, i) => {
//               return (
//                 <div
//                   key={i}
//                   style={{ width: 52, height: 52, border: "1px solid", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//                 >{column}</div>
//               );
//             })}
//           </div>
//         );
//       })}
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";

const NUM_ROWS = 6;
const NUM_COLS = 5;
const WORD_LIST = ["REACT", "BRAIN", "CODES", "HOOKS", "STATE", "HITLER"];

export default function Wordle() {
  const targetWord = useRef(
    WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].split("")
  );

  const [board, setBoard] = useState(
    Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(""))
  );
  const [statuses, setStatuses] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameStatus !== "playing") return;

      const key = event.key;

      if (/^[a-zA-Z]$/.test(key)) {
        if (currentCol < NUM_COLS) {
          const updated = [...board];
          updated[currentRow][currentCol] = key.toUpperCase();
          setBoard(updated);
          setCurrentCol((prev) => prev + 1);
        }
      }

      if (key === "Backspace") {
        if (currentCol > 0) {
          const updated = [...board];
          updated[currentRow][currentCol - 1] = "";
          setBoard(updated);
          setCurrentCol((prev) => prev - 1);
        }
      }

      if (key === "Enter") {
        if (currentCol === NUM_COLS) {
          const guess = board[currentRow];
          const statusRow = getRowStatuses(guess, targetWord.current);
          setStatuses((prev) => [...prev, statusRow]);

          if (guess.join("") === targetWord.current.join("")) {
            setGameStatus("win");
          } else if (currentRow === NUM_ROWS - 1) {
            setGameStatus("lose");
          } else {
            setCurrentRow((prev) => prev + 1);
            setCurrentCol(0);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, currentCol, currentRow, gameStatus]);

  function getRowStatuses(guess, target) {
    const result = Array(NUM_COLS).fill("wrong");
    const used = Array(NUM_COLS).fill(false);

    for (let i = 0; i < NUM_COLS; i++) {
      if (guess[i] === target[i]) {
        result[i] = "correct";
        used[i] = true;
      }
    }

    for (let i = 0; i < NUM_COLS; i++) {
      if (result[i] === "correct") continue;
      const idx = target.findIndex((ch, j) => ch === guess[i] && !used[j]);
      if (idx !== -1) {
        result[i] = "close";
        used[idx] = true;
      }
    }

    return result;
  }

  function getColor(status) {
    if (status === "correct") return "green";
    if (status === "close") return "goldenrod";
    if (status === "wrong") return "#ccc";
    return "white";
  }

  return (
    <div style={{ margin: 20 }}>
      <h2>Wordle Clone</h2>

      {board.map((row, rowIdx) => (
        <div style={{ display: "flex" }} key={rowIdx}>
          {row.map((cell, colIdx) => {
            const status =
              statuses[rowIdx] && statuses[rowIdx][colIdx]
                ? statuses[rowIdx][colIdx]
                : null;

            return (
              <div
                key={colIdx}
                style={{
                  width: 52,
                  height: 52,
                  margin: 4,
                  border: "2px solid #555",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                  textTransform: "uppercase",
                  backgroundColor: getColor(status),
                  color: status ? "white" : "black",
                }}
              >
                {cell}
              </div>
            );
          })}
        </div>
      ))}

      {gameStatus === "win" && <h3 style={{ color: "green" }}>🎉 You Win!</h3>}
      {gameStatus === "lose" && (
        <h3 style={{ color: "red" }}>
          ❌ You Lose! The word was {targetWord.current.join("")}
        </h3>
      )}
    </div>
  );
}

