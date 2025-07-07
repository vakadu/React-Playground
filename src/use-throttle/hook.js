import { useRef } from "react";

export default function useThrottle(fn, limit=2000) {
    const last = useRef(0);

    return function(...args) {        
        const now = Date.now();        
        if(now-last.current >= limit) {
            fn(...args);
            last.current = now
        }
    }
}
