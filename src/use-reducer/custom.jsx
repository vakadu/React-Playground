import { useState } from "react";

export default function CustomReducer(reducer, intialState) {
  const [state, updateState] = useState(intialState);

  function dispatch(action) {
    const newState = reducer(state, action);
    updateState(newState);
  }

  function dispatchBatch(actions) {
    actions.forEach((action) => {
      const newState = reducer(state, action);
      updateState(newState);
    });
  }

  async function dispatchAsync(asyncAction) {
    const action = await asyncAction();
    dispatch(action);
  }

  return [state, dispatch, dispatchBatch, dispatchAsync];
}
