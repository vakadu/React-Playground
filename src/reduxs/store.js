export function createStore(reducer, initialState) {
    let state = initialState;
    let listeners = new Set();

    function getState() {
        return state
    }

    function dispatch(action) {
        state = reducer(state, action);
        for(let listener of listeners) {
            listener()
        }
    }

    function subscribe(listener) {
        listeners.add(listener);

        return () => {
            listeners.delete(listener)
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }

}
