import React, { useEffect, useState } from "react";

const randomCards = () => {
  let cards = [];
  for (let i = 1; i <= 18; i++) {
    cards.push(i, i);
  }

  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

const MemoryGame = () => {
  const table = randomCards();
  const [grid, setGrid] = useState(table);
  const [opened, setOpened] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    if (opened.length === 2) {
      const isCorrect = grid[opened[0]] === grid[opened[1]];
      setTimeout(() => {
        if (isCorrect) {
          setSolved((prev) => {
            return [...prev, grid[opened[1]]];
          });
        }
        setOpened([]);
      }, 600);
    }
  }, [opened]);

  const handleItem = (g, i) => {
    if (opened.length === 2) {
      return;
    }
    setOpened((prev) => {
      return [...prev, i];
    });
  };

  const getClassName = (g, i) => {
    if (solved.includes(g)) {
      return "remove";
    } else if (opened.includes(i)) {
      return "show";
    } else {
      return "hide";
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        maxWidth: "calc(6*52px)",
        margin: "20px auto",
        gap: 12,
      }}
    >
      {grid.map((g, i) => {
        let className = getClassName(g, i);
        return (
          <div
            style={{
              width: 52,
              height: 52,
              border: "1px solid teal",
              backgroundColor: "teal",
            }}
            className={className}
            key={i}
            data-id={g}
            onClick={() => handleItem(g, i)}
          >
            <span>{g}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MemoryGame;
