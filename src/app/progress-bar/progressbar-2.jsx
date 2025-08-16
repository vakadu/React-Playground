import { useEffect, useState } from "react";

export default function ProgressBar2() {
  const [bars, setBars] = useState(0);
  return (
    <div>
      <button onClick={() => setBars(bars + 1)}>add</button>
      {Array.from({ length: bars }).map((_, bar) => {
        return <ProgressBar key={bar} />;
      })}
    </div>
  );
}

function ProgressBar() {
  const [startTransition, setStartTransition] = useState(false);

  // Start transition after first render and never
  // apply this effect ever again.
  useEffect(() => {
    if (startTransition) {
      return;
    }

    setStartTransition(true);
  });

  return (
    <div style={{ height: 8 }}>
      <div
        style={{
          backgroundColor: "green",
          height: "100%",
          transform: startTransition ? "scaleX(1)" : "scaleX(0)",
          transitionDuration: "200ms",
          border: "1px solid",
          transformOrigin: "left",
        }}
      ></div>
    </div>
  );
}
