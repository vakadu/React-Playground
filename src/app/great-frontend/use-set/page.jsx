'use client'

import useSet from "../_hooks/use-set";


export default function UseSet() {
  const { set, add, remove, toggle, reset, clear, has } = useSet(new Set(['hello']));

  return (
    <div className="flex flex-col">
      <button onClick={() => add(Date.now().toString())}>Add</button>
      <button onClick={() => remove('hello')} disabled={!has('hello')}>
        Remove 'hello'
      </button>
      <button onClick={() => toggle('hello')}>Toggle hello</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => clear()}>Clear</button>
      <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
    </div>
  );
}
