import { useEffect } from "react";
import { useState } from "react";

const config = {
  red: {
    next: "yellow",
    duration: 4000,
  },
  yellow: {
    next: "green",
    duration: 500,
  },
  green: {
    next: "red",
    duration: 3000,
  },
};

export default function TrafficLight() {
  const [currentColor, setCurrentColor] = useState("green");

  useEffect(() => {
    const { next, duration } = config[currentColor];

    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    return () => clearTimeout(timerId);
  }, [currentColor]);

  return <div style={{ backgroundColor: currentColor }}>{currentColor}</div>;
}
