"use client";

import { useEffect } from "react";
import { useState } from "react";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setStart] = useState(false);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Use functional update to get the latest time value
      }, 10);
    }

    return () => clearInterval(timerId); // Clean up interval when component unmounts or isRunning changes
  }, [isRunning]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliSeconds = time % 100;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <div>{formatTime(time)}</div>
      <button onClick={() => setStart(!isRunning)}>start</button>
      <button onClick={() => setStart(!isRunning)}>stop</button>
      <button
        onClick={() => {
          setTime(0);
          setStart(!isRunning);
        }}
      >
        reset
      </button>
    </div>
  );
}
