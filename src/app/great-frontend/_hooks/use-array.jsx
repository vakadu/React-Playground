
import {useState} from 'react'

export default function useArray(defaultValue) {
  const [array, setState] = useState(defaultValue);

  function push(item) {
    setState((prev) => [...prev, item]);
  }

  function update(index, newItem) {
    const newItems = array.map((item, i) => {
      if (i === index) {
        return newItem;
      }
      return item;
    });
    setState(newItems);
  }

  function remove(index) {
    const newItems = array.filter((item, i) => i !== index);
    setState(newItems);
  }

  function filter(predicate) {
    const newItems = array.filter(predicate);
    setState(newItems);
  }

  function clear() {
    setState([]);
  }

  function set(defaultItems) {
    setState(defaultItems);
  }

  return {
    push,
    update,
    remove,
    filter,
    clear,
    array,
    set,
  };
}
