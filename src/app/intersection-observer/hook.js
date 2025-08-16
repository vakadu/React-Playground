import { useEffect, useState } from "react";

export default function useIntersectionObserve(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false); // Fixed typo in state variable

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting); // Set state based on entry intersection
        }, { threshold: 0.8 });

        if (ref?.current) {
            observer.observe(ref.current);
        }

        // Cleanup observer when component unmounts
        return () => {
            if (ref?.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]); // Only rerun effect when ref changes

    return { isIntersecting };
}
