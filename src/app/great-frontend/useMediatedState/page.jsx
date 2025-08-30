'use client'

import { useMediatedState } from "./_useMediatedState";

const replaceMultipleSpaces = (s) => s.replace(/[\s]+/g, ' ');

export default function Component() {
  const [state, setState] = useMediatedState(replaceMultipleSpaces, '');

  return (
    <div>
      <div>You will not be able to enter more than one space</div>
      <input
        type="text"
        min="0"
        max="10"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}
