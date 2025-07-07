import { useRef } from "react";

export function useDebounce(fn, delay=500) {
    let timeout = useRef(null);

    return function(...args) {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
