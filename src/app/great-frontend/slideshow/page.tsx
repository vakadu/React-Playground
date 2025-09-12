"use client";

import { useEffect, useRef, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1755398105315-a124a12152da?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1757023177496-131ded651c01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1645242075656-e4e435b7a5f5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Page() {
  const [id, setId] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<any>(null);
  console.log(id);
  

  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(() => {
        setId((prev) => (prev + 1) % images.length);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [id, paused]);

  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) {
        setPaused(true);
      } else {
        setPaused(false);
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  //   useEffect(() => {
  //     if(id === images.length-1) {
  //         setTimeout(() => {
  //         setId(0)
  //       }, 3000)
  //     }
  //   }, [id])

  const handlePrev = () => {
    setId((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setId((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative h-screen"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        disabled={id === 0}
        onClick={handlePrev}
        className="absolute top-1/2 left-0 bg-white p-4"
      >
        Prev
      </button>
      <img src={images[id]} className="object-contain" />
      <button
        disabled={id === images.length - 1}
        onClick={handleNext}
        className="absolute top-1/2 right-0 bg-white p-4"
      >
        Next
      </button>
    </div>
  );
}
