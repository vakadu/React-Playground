import { useEffect, useState } from "react";
import usePrev from "./prev";

export default function UsePrev() {
  const [counter, setCounter] = useState(0);
  const prev = usePrev(counter);

  return (
    <div>
      <div>Prev: {prev}</div>
      <button onClick={() => setCounter(counter + 1)}>Inc</button>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter - 1)}>Dec</button>
    </div>
  );
}
