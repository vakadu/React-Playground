const MIN = 0;
const MAX = 100;

function ProgressBar({ value }) {
  // Handle invalid values and convert them to be within [0, 100].
  const clampedValue = Math.min(Math.max(value, MIN), MAX);

  return (
    <div style={{ margin: "10px" }}>
      <div
        style={{ width: `${clampedValue}%`, backgroundColor: "#0d6efd" }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
      >
        {clampedValue}%
      </div>
    </div>
  );
}

export default function Bar() {
  return (
    <div>
      <ProgressBar value={0} />
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
      <ProgressBar value={100} />
      <ProgressBar value={2} />
      <ProgressBar value={-10} />
      <ProgressBar value={120} />
    </div>
  );
}
