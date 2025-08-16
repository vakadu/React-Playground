import { useEffect, useState } from "react";

const lines = [
  // Rows
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // Columns
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // Diagonals
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

const useTicTacToe = () => {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => new Array(3).fill(""))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // const tempBoard = [...board];
    // tempBoard[0] = [...tempBoard[0]];
    // tempBoard[0][0] = 'X';
    // setBoard(tempBoard)
    // const tempBoard = board.map((row, i) => {
    //   if(i === 0) {
    //     return row.map((cell, j) => {
    //       if(j===0) {
    //         return 'X'
    //       }
    //       return cell
    //     })
    //   }
    //   return row
    // });
    // setBoard(tempBoard)
  }, []);

  const handleClick = (i, j) => {
    let tempBoard = board.map((row, r) => {
      if (r === i) {
        return row.map((cell, c) => {
          if (c === j) {
            return currentPlayer;
          }
          return cell;
        });
      }
      return row;
    });
    setBoard(tempBoard);
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    getStatus(tempBoard);
  };

  const getStatus = (board) => {
    const filled = board.flat().every((cell) => cell !== "");
    let winner = null

    for (const line of lines) {
      const [[a1, a2], [b1, b2], [c1, c2]] = line;
      
      if(board[a1][a2] && board[a1][a2] === board[b1][b2] && board[a1][a2] === board[c1][c2]) {
        winner = board[a1][a2];
        break;
      }
    }

    if(winner) {
      setWinner(winner);
    } else if(filled) {
     setWinner('draw');
    } else {
      return null
    }
  };

  return {
    board,
    handleClick,
    currentPlayer,
    getStatus,
    winner
  };
};

export default useTicTacToe;
