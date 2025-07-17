import { useEffect, useRef, useState } from "react";

let slots = [];
let currentSlot = 0

function useCustomUseState(initialValue) {
  // let state = useRef(initialValue);

  // function setState(value) {    
  //   state.current = value
  // }
  
  // return [state.current, setState]

  if(!slots[currentSlot]) {
      slots[currentSlot] = initialValue;
  }

  const [_, setRerender] = useState(false)

  function setState(newVal) {
    slots[currentSlot] = newVal;
    setRerender((prev) => !prev);
  }
  
  currentSlot++;


  console.log(slots, currentSlot, "===");

  return [slots[currentSlot-1], setState]
}

export function CustomUseState() {
  const [fruit, setFruit] = useCustomUseState('banana');
  console.log(fruit);
  

  useEffect(() => {
    console.log(fruit);
    
  }, [fruit])

  return(
    <div onClick={() => setFruit('apple')}>{fruit}</div>
  )
}
