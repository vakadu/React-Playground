"use client";

import { useState } from "react";

const urls = [
  "https://example.com",
  "https://about.me",
  "https://news.site",
  "https://contact.info",
  "https://myportfolio.org",
  "https://funnyclips.tv",
  "https://techhub.dev",
  "https://foodrecipes.net",
  "https://traveldiary.io",
  "https://gamezone.gg",
];

export default function Index() {
  const [history, setHistory] = useState([]);
  const [stack, setStack] = useState([]);
  console.log(history, stack);

  const random = () => {
    const rand = Math.floor(Math.random() * urls.length);
    return urls[rand];
  };

  const handleHistory = () => {
    const randomUrl = random();
    setHistory((prev) => [...prev, randomUrl]);
  };

  const handleBack = () => {
    let last = [...history][history.length - 1];

    setHistory(history.slice(0, history.length - 1));
    setStack((prev) => [...prev, last]);

    //with pop
    // let tempHistory = [...history];
    // tempHistory.pop();
    // setHistory(tempHistory);
  };

  const handlePrev = () => {
    let last = [...stack][stack.length - 1];
    setHistory((prev) => [...prev, last]);
    setStack(stack.slice(0, stack.length - 1));
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 24 }}>
        <div>
          {/* reverse is inplace and directly mutates history so use slice */}
          {history
            .slice()
            .reverse()
            .map((h, i) => {
              return <div key={i}>{h}</div>;
            })}
        </div>
        <div>
          {stack
            .slice()
            .reverse()
            .map((h, i) => {
              return <div key={i}>{h}</div>;
            })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
        <button onClick={handleHistory}>History</button>
        <button onClick={handleBack}>Go Back</button>
        <button onClick={handlePrev}>Go Prev</button>
      </div>
    </div>
  );
}
