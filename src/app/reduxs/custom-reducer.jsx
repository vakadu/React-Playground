import { useState } from "react"

export default function useCustomReducer(reducer, initialState) {
    const [state, setState] = useState(initialState)

    function dispatch(action) {
        setState((prev) => reducer(prev, action))
    }

    return [state, dispatch]
}
