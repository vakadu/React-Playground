'use client'

import useArray from "../_hooks/use-array";

const defaultValue = ['apple', 'banana'];

export default function UseArray() {
  const { array, push, update, remove, filter, set, clear } = useArray([]);

  return (
    <div className="flex flex-col">
      <p>Fruits: {array.join(', ')}</p>
      <button onClick={() => push('orange')}>Add orange</button>
      <button onClick={() => update(1, 'grape')}>
        Change second item to grape
      </button>
      <button onClick={() => remove(0)}>Remove first</button>
      <button onClick={() => filter((fruit) => fruit.includes('a'))}>
        Keep fruits containing 'a'
      </button>
      <button onClick={() => set(defaultValue)}>Reset</button>
      <button onClick={clear}>Clear list</button>
    </div>
  );
}
