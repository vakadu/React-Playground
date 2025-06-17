import { useEffect } from "react";
import useCustomReducer from "./custom-reducer";
import { createStore } from "./store";

function reducer(state, action) {
  switch (action.type) {
    case "INC":
      return { count: state.count + 1 };
    case "DEC":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(reducer, { count: 0 });

export default function AppRedux() {
//   const [count, setCount] = useState(store.getState().count);
  const [state, dispatch] = useCustomReducer(reducer, {count: 0});


//   useEffect(() => {
//     const unsubscribe = store.subscribe(() => {
//       setCount(store.getState().count);
//     });

//     return () => unsubscribe();
//   }, []);

  return (
    <div>
      <div>{state.count}</div>
      {/* <div onClick={() => store.dispatch({ type: "INC" })}>INC</div>
      <div onClick={() => store.dispatch({ type: "DEC" })}>DEC</div> */}
        <div onClick={() => dispatch({ type: "INC" })}>INC</div>
      <div onClick={() => dispatch({ type: "DEC" })}>DEC</div>

    </div>
  );
}
