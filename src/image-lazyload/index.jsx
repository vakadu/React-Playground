import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import useInView from "./use-in-view";

export default function Lazyload() {
  const { isVisible, ref } = useInView({ threshold: 1.0 });

  return (
    <section>
      {Array.from({ length: 100 }).map((_, i) => {
        return <div>{i + 1}</div>;
      })}
      <img
        ref={ref}
        src={
          isVisible
            ? "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            : null
        }
        style={{ width: 500, height: 500 }}
      />
    </section>
  );
}
