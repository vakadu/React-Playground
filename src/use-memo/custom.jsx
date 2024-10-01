import { useRef } from "react";

export default function CustomUseMemo(cb, deps) {
  const prev = useRef(deps);
  const isFirst = useRef(true);
  const memoizedVal = useRef(null);

  if (isFirst.current) {
    isFirst.current = false;
    memoizedVal.current = cb();
    return memoizedVal.current;
  }

  const hasDepsChanged = deps?.some((dep, i) => dep !== prev.current[i]);

  if (hasDepsChanged) {
    prev.current = deps;
    memoizedVal.current = cb();
  }

  return memoizedVal.current;
}
