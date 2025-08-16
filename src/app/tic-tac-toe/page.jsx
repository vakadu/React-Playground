"use client";

import "./index.css";
import useTicTacToe from "./hooks";
import {v4 as uuidv4} from 'uuid'

const TicTacToe = () => {
  const { board, handleClick, currentPlayer, winner } = useTicTacToe();

  return (
    <section>
      <div style={{margin: '16px 0'}}>Current Player: {currentPlayer}</div>
      <div>{winner}</div>
      {board.map((row, i) => {        
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              width: 156,
              gap: 2,
            }}
            key={uuidv4()}
          >
            {row.map((cell, j) => (
              <button
                style={{
                  width: 52,
                  height: 52,
                  border: "1px solid #333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
                key={uuidv4()}
                onClick={() => handleClick(i, j)}
                disabled={cell}
              >
                {cell}
              </button>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default TicTacToe;
