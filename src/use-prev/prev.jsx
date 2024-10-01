import { useRef } from "react";

export default function usePrev(val) {
  const currentref = useRef(val);
  const prevRef = useRef();

  if (currentref.current !== val) {
    prevRef.current = currentref.current;
    currentref.current = val;
  }

  return prevRef.current;
}
