// set: The current set of items
// add: (item) => void: A function that adds item to the set
// remove: (item) => void: A function that removes item from the set
// toggle: (item) => void: A function that toggles the presence of item in the set
// reset: () => void: A function that resets the set to initialState
// clear: () => void: A function that removes all items in the set

import { useRef } from "react";
import { useState } from "react"


export default function useSet(initialState = new Set()) {
    const initialRef = useRef(initialState)
    
    const [set, setState] = useState(initialState)
    console.log(initialRef, set);

    function add(item) {
        let newState = new Set(set);
        newState.add(item);
        setState(newState)
    }

    function remove(item) {
        let newState = new Set(set);
        if(newState.has(item)) {
            newState.delete(item)
        }
        setState(newState)
    }

    function toggle(item) {
        let newState = new Set(set);
        if(newState.has(item)) {
            newState.delete(item)
        } else {
            newState.add(item);
        }
        setState(newState)
    }

    function reset() {
         setState(new Set(initialRef.current))
    }

    function clear() {
        setState(new Set())
    }

    function has(item) {
        return set.has(item)
    }

    return {
        set,
        add,
        remove,
        toggle,
        reset,
        clear,
        has
    }
}
