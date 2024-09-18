import { useState } from "react";

const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const useTicTacToe = () => {
  const table = new Array(9).fill(null);
  const [board, setBoard] = useState(table);
  const [isXNext, setIsXNext] = useState(true);

  const caluculateWinner = (currBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];

      if (
        currBoard[a] &&
        currBoard[a] === currBoard[b] &&
        currBoard[a] === currBoard[c]
      ) {
        return currBoard[a];
      }
    }
    return null;
  };

  const handleButton = (i) => {
    const winner = caluculateWinner(board);

    if (winner || board[i]) {
      return;
    }

    let newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatus = () => {
    const winner = caluculateWinner(board);

    if (winner) {
      return `${winner} has won`;
    }

    return `${isXNext ? "X" : "O"} turn`;
  };

  return {
    board,
    handleButton,
    getStatus,
  };
};

export default useTicTacToe;
