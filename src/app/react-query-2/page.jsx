"use client";

import Child from "./child";
import { createQueryClient } from "./client";
import { SwrProvider } from "./react-query";

const queryClient = createQueryClient();

export default function Page() {
  return (
    <SwrProvider value={queryClient}>
      <Child />
    </SwrProvider>
  );
}
