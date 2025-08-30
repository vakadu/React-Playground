import { useRef } from "react";
import { useState } from "react";
import { useEffect, useReducer } from "react";

function asyncReducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        loading: true,
        status: "loading",
        error: undefined,
        value: undefined,
      };
    case "success":
      return {
        loading: false,
        status: "success",
        error: undefined,
        value: action.value,
      };
    case "error":
      return {
        loading: false,
        status: "error",
        error: action.error,
        value: undefined,
      };
    default:
      return state;
  }
}

export function useAsync(fn, deps = []) {
  const [state, dispatch] = useReducer(asyncReducer, {
    loading: false,
    status: "idle",
    error: undefined,
    value: undefined,
  });
  const id = useRef(0);

  async function fetchData() {
    dispatch({ type: "start" });
    const tempId = ++id.current;
    try {
      const response = await fn();
      if (tempId === id.current) {
        dispatch({ type: "success", value: response });
      }
    } catch (error) {
      if (tempId === id.current) {
        dispatch({ type: "error", error });
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, deps);

  return state;
}

// export function useAsync(fn) {
//   const [status, setStatus] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [data, setData] = useState();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     setLoading(true);
//     setStatus('loading')
//     try {
//       const response = await fn();
//       setData(response);
//       setStatus('success')
//     } catch (error) {
//       setError(error);
//       setStatus('error')
//     } finally {
//         setLoading(false)
//     }
//   }

//   return {
//     loading,
//     error,
//     value: data,
//     status
//   };
// }
