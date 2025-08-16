"use client";

import { useState } from "react";

function useStateWithHistory(initialValue) {
  const [state, setState] = useState(initialValue);
  const [history, setHistory] = useState([initialValue]); // Store history as an array
  const [currentIndex, setCurrentIndex] = useState(0); // Track current position in history

  const setHistoryState = (newState) => {
    // If we're not at the end of the history, remove the "future" history after the current position
    if (currentIndex < history.length - 1) {
      setHistory(history.slice(0, currentIndex + 1));
    }
    setHistory((prevHistory) => [...prevHistory, newState]); // Add new state to history
    setCurrentIndex(currentIndex + 1); // Move forward in history
    setState(newState); // Update state
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setState(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setState(history[currentIndex + 1]);
    }
  };

  return [state, setHistoryState, undo, redo];
}

export default function StateWithHistoryExample() {
  const [count, setCount, undo, redo] = useStateWithHistory(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}
