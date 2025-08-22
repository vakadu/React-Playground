'use client'

import { useWindowSize } from "../_hooks/useWindowSize";


export default function UseWindowSize() {
  const screen = useWindowSize();

  return (
    <div>
      <p>The current window dimensions are:</p>
      <code>{JSON.stringify(screen, null, 2)}</code>
    </div>
  );
}
