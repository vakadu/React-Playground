export function createStore(reducer, intialState) {
  const state = intialState;
  const subscribers = new Set();

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(action, state);
    subscribers.forEach((subs) => subs());
  };

  const subscribe = (sub) => {
    subscribers.add(sub);

    return () => subscribers.delete(sub);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
