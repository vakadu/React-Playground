'use client'

import { useState } from "react";
import useTimeout from "../_hooks/use-timeout";


export default function UseTimeout() {
  const [loading, setLoading] = useState(true);

  useTimeout(() => setLoading(false), 1000);

  return (
    <div>
      <p>{loading ? 'Loading' : 'Ready'}</p>
    </div>
  );
}