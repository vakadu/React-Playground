"use client";

import { useRef } from "react";
import useIntersectionObserve from "./hook"

export default function UseIntersectionObserver() {
    return(
        <div>
            <Ref1/>
            <Ref2/>
            <Ref3/>
        </div>
    )
}


function Ref1() {
    const ref1 = useRef(null);
    const {isIntersecting} = useIntersectionObserve(ref1);
    

    return(
        <div>
            <div style={{height: '100vh'}} ref={ref1}>
                Status: {isIntersecting ? 'Yes' : 'No'}
            </div>
        </div>
    )
}

function Ref2() {
    const ref1 = useRef(null);
    const {isIntersecting} = useIntersectionObserve(ref1);
    

    return(
        <div>
            <div style={{height: '100vh'}} ref={ref1}>
                Status: {isIntersecting ? 'Yes' : 'No'}
            </div>
        </div>
    )
}

function Ref3() {
    const ref1 = useRef(null);
    const {isIntersecting} = useIntersectionObserve(ref1);
    

    return(
        <div>
            <div style={{height: '100vh'}} ref={ref1}>
                Status: {isIntersecting ? 'Yes' : 'No'}
            </div>
        </div>
    )
}
