import { useRef } from "react";

export default function UseCustomCallback(cb, deps) {
  const prevDeps = useRef(deps);
  const cbRef = useRef(cb);

  const hasDepsChanged = deps.some((dep, i) => dep !== prevDeps.current[i]);

  if (hasDepsChanged) {
    cbRef.current = cb;
    prevDeps.current = deps;
  }

  return function () {
    return cbRef.current();
  };
}
