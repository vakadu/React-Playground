import { useEffect, useState } from "react";

function ProgressBar({ isEmpty, onCompleted }) {
  const [startTransition, setStartTransition] = useState(false);

  // Start transition when the bar is no longer empty.
  useEffect(() => {
    if (isEmpty || startTransition) {
      return;
    }

    setStartTransition(true);
  }, [isEmpty]);

  return (
    <div className="bar">
      <div
        className={["bar-contents", startTransition && "bar-contents--filled"]
          .filter(Boolean)
          .join(" ")}
        onTransitionEnd={() => {
          onCompleted();
        }}
      />
    </div>
  );
}

const CONCURRENCY_LIMIT = 3;

export default function ProgressBar3() {
  const [bars, setBars] = useState(0);
  const [numFilledUpBars, setNumFilledUpBars] = useState(0);

  return (
    <div className="wrapper">
      <div>
        <button
          onClick={() => {
            setBars(bars + 1);
          }}
        >
          Add
        </button>
      </div>
      <div className="bars">
        {Array(bars)
          .fill(null)
          .map((_, index) => (
            <ProgressBar
              isEmpty={index >= numFilledUpBars + CONCURRENCY_LIMIT}
              key={index}
              onCompleted={() => {
                setNumFilledUpBars(numFilledUpBars + 1);
              }}
            />
          ))}
      </div>
    </div>
  );
}
