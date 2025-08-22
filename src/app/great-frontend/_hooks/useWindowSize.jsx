import { useEffect, useState } from "react";

export function useWindowSize() {
    const [screen, setScreen] = useState();

    useEffect(() => {

        function handleResize() {            
            setScreen({
                width: window.innerWidth,
                 height: window.innerHeight,
            })            
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

    return {
        width: screen?.width,
        height: screen?.height
    }
}