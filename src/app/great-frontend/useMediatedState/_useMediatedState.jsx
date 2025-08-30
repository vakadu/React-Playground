import { useState } from "react";

export function useMediatedState(mediator, initialState) {
    const [initial, setInitial] = useState(initialState);

    function set(v) {
        const r = mediator(v);
        setInitial(r)
    }

    return [initial, set]
}