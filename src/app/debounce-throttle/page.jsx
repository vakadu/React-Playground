// import { useState, useEffect, useRef } from "react";

// function debounce(fn, delay) {
//   let timeout;
//   return function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => fn.apply(this, args), delay);
//   };
// }

// function throttle(fn, limit) {
//   let lastCall = 0;
//   return function (...args) {
//     const now = Date.now();
//     if (now - lastCall >= limit) {
//       lastCall = now;
//       fn.apply(this, args);
//     }
//   };
// }

// export default function DebounceThrottleDemo() {
//   const [debouncedValue, setDebouncedValue] = useState("");
//   const [throttledValue, setThrottledValue] = useState("");

//   const logDebounce = useRef(debounce((val) => {
//     console.log("Debounced:", val);
//   }, 500));

//   const logThrottle = useRef(throttle((val) => {
//     console.log("Throttled:", val);
//   }, 500));

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Debounce vs Throttle</h2>

//       <div style={{ marginBottom: 16 }}>
//         <label>Debounced Input: </label>
//         <input
//           value={debouncedValue}
//           onChange={(e) => {
//             const val = e.target.value;
//             setDebouncedValue(val);
//             logDebounce.current(val);
//           }}
//         />
//       </div>

//       <div>
//         <label>Throttled Input: </label>
//         <input
//           value={throttledValue}
//           onChange={(e) => {
//             const val = e.target.value;
//             setThrottledValue(val);
//             logThrottle.current(val);
//           }}
//         />
//       </div>
//     </div>
//   );
// }


// import { useRef, useEffect } from "react";

// import { useRef, useEffect, useCallback } from "react";

// export function useDebounceFn(fn, delay) {
//   const timeoutRef = useRef(null);

//   const debounced = useCallback((...args) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   }, [fn, delay]);


//   //for cancelling
//   debounced.cancel = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   return debounced;
// }

// import { useState } from "react";
// import { useDebounceFn, useThrottleFn } from "./hooks"; 

// export default function Demo() {
//   const [val, setVal] = useState("");

//   const logDebounced = useDebounceFn((text) => {
//     console.log("Debounced", text);
//   }, 500);

//   const logThrottled = useThrottleFn((text) => {
//     console.log("Throttled", text);
//   }, 500);

//   return (
//     <div>
//       <input
//         placeholder="Debounce"
//         onChange={(e) => {
//           setVal(e.target.value);
//           logDebounced(e.target.value);
//         }}
//       />
//       <input
//         placeholder="Throttle"
//         onChange={(e) => {
//           setVal(e.target.value);
//           logThrottled(e.target.value);
//         }}
//       />
//     </div>
//   );
// }


