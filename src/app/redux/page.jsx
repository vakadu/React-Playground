"use client";

import { useReducer } from "react";
import { createContext } from "react";
import { counterReducer } from "./reducer";
import { useContext } from "react";
import { decrement, increment } from "./actions";

const StoreContext = createContext();

const useStore = () => {
  return useContext(StoreContext);
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

const App = () => {
  return (
    <Provider>
      <Counter />
    </Provider>
  );
};

const Counter = () => {
  const { state, dispatch } = useStore();
  console.log(state);

  return (
    <div>
      {state.count}
      <button onClick={() => dispatch(increment())}>inc</button>
      <button onClick={() => dispatch(decrement())}>dec</button>
    </div>
  );
};

export default App;
