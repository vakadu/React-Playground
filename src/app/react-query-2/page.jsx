"use client";

import Child from "./child";
import { createQueryClient } from "./client";
import { SwrProvider } from "./react-query";

export const queryClient = createQueryClient();

export default function ReactSwr() {
  return (
    <SwrProvider value={queryClient}>
      <Child />
    </SwrProvider>
  );
}
