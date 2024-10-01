import { useEffect, useReducer } from "react";
import CustomReducer from "./custom";

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return state + 1;
    case "dec":
      return state - 1;
    default:
      return;
  }
}

function fruitsReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "success":
      return {
        ...state,
        loading: false,
        fruits: action.payload,
      };
    case "failure":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

const fruits = [
  { name: "Apple", quantity: 10 },
  { name: "Banana", quantity: 5 },
  { name: "Orange", quantity: 8 },
];

function api() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fruits);
    }, 2000);
  });
}

const intialState = {
  loading: false,
  fruits: [],
  error: null,
};

export default function UseReducer() {
  const [state, dispatch] = CustomReducer(reducer, 0);
  //   const [state, dispatch] = CustomReducer(fruitsReducer, intialState);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     dispatch({ type: "loading" });
  //     try {
  //       const data = await api();
  //       dispatch({ type: "success", payload: data });
  //     } catch (err) {
  //       dispatch({ type: "failure", error: err });
  //     }
  //   };
  //   console.log(state);

  return (
    <div>
      {/* {state.fruits.map((item) => {
        return <div>{item.name}</div>;
      })} */}
      <button onClick={() => dispatch({ type: "incr" })}>Inc</button>
      <div>{state}</div>
      <button onClick={() => dispatch({ type: "dec" })}>Dec</button>
    </div>
  );
}
