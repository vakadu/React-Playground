"use client";

import Comp1 from "./comp1";
import Comp2 from "./comp2";
import { QueryClient } from "./query-client";
import QueryClientProvider from "./query-client-provider";

export default function ReactQuery() {
  const client = new QueryClient();
  return (
    <QueryClientProvider value={client}>
      <Comp1 />
      <Comp2 />
    </QueryClientProvider>
  );
}
