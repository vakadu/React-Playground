"use client";

import { useEffect } from "react"

function useTimeout(cb, delay) {
    useEffect(() => {
        let timeout;

        timeout = setTimeout(() => {
            cb();
        }, delay)

        return () => {
            clearTimeout(timeout)
        }
    }, [cb, delay])
}

export default function UseTimeout() {

    useTimeout(hello, 2000)

    function hello() {
        console.log("hello");
        
    }

    return(
        <div></div>
    )
}
