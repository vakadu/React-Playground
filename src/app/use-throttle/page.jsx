"use client";

import useThrottle from "./hook"

export default function ThrottleFunc() {
    function handleClick(str) {
        console.log(str);
        
    }

    const throttle = useThrottle(handleClick);

    function onClick(msg) {        
        throttle(msg)
    }

    return(
        <div>
            <button onClick={() => onClick("hi")}>Click me</button>
        </div>
    )
}
