import { useEffect } from "react";
import { useRef } from "react";

export function useDebounce(cb, delay) {
    const timerRef = useRef()

    function debouncedFun(...args) {
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            cb(...args)
        }, delay)
    }

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current)
        }
    }, [])

    return debouncedFun
}
