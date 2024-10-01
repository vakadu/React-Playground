import { useRef } from "react";

export const CustomUseEffect = (cb, deps) => {
  const firstRender = useRef(true);
  const prevDeps = useRef(deps);

  if (firstRender.current) {
    firstRender.current = false;
    const cleanup = cb();
    return () => cleanup();
  }

  const depsChange = deps.some((dep, index) => dep !== prevDeps.current[index]);

  if (depsChange) {
    prevDeps.current = deps;
    const cleanup = cb();
    return () => cleanup();
  }
};
